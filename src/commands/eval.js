const createEmbed = require("../module/createEmbed");
const getMessage = require("../module/getMessage");
const quickEmbed = require("../module/quickEmbed");
const request = require("request");
const fs = require("fs");

// prettier-ignore
const langList = ["c","cpp","objective-c","java","kotlin","scala","swift","csharp","go","haskell","erlang","perl","python","python3","ruby","php","bash","r","javascript","coffeescript","vb","cobol","fsharp","d","clojure","elixir","mysql","rust","scheme","commonlisp","plain",];

exports.run = async (client, Discord, message, config, args) => {
	if (args[0] == "lang") {
		const e = createEmbed(
			getMessage("command.eval.title", config.emoji.terminal),
			getMessage("command.eval.supportLanguageList") + "\n**`" + langList.join("`**, **`") + "`**",
			config.color.normal,
			true
		);
		return await message.channel.send({ embeds: [e] });
	}

	// args 없을때
	if (!args || args.length < 2) return await message.channel.send({ embeds: [quickEmbed.noArgs()] });

	const lang = args[0];
	args.shift(); // 배열에서 첫번째 값(lang) 제거
	let code = args.join(" "); // 배열 문자열로

	// 지원 안하는 언어라면
	if (langList.indexOf(lang) == -1)
		return await message.channel.send({
			embeds: [
				createEmbed(
					getMessage("command.eval.error.notSupportLanguage.title", config.emoji.x, lang),
					getMessage("command.eval.error.notSupportLanguage.description", config.prefix),
					config.color.error,
					true
				),
			],
		});

	// 파이썬 인코딩 해결
	if (lang.includes("python")) {
		code = "# coding=UTF-8\n" + code;
	}
	var jsonDataObj = { code: code, lang: lang };
	request.post(
		{
			headers: { "content-type": "application/json" },
			url: config.api.eval,
			body: jsonDataObj,
			json: true,
		},
		async function (error, response, body) {
			const output = body;
			const time = body.time;

			// 이발 오류 처리
			if (output.stderr != "") {
				// console.log(output.toString("utf8"));
				const fields = [
					{
						name: getMessage("command.eval.field.input"),
						value: "```" + lang.replace("python3", "python") + "\n" + code + "\n" + "```",
					},
					{
						name: getMessage("command.eval.field.output") + " (Error)",
						value: "```\n" + output.stderr + "\n```",
					},
				];
				const e = createEmbed(getMessage("command.eval.title", config.emoji.terminal), null, config.color.error, true, fields, {
					text: getMessage("command.eval.field.timeTaken", time),
				});
				// 6000자 이상이면 output결과 파일로 전송
				if (e.length > 5999) {
					const date = new Date().getTime();
					fs.writeFileSync(`./src/temp/${date}.txt`, output.stdout, "utf8");
					const fields = [
						{
							name: getMessage("command.eval.field.input"),
							value: "```" + lang.replace("python3", "python") + "\n" + code + "\n" + "```",
						},
						{
							name: getMessage("command.eval.field.output") + " (Error)",
							value: getMessage("command.eval.field.fileReference", `${date}.txt`),
						},
					];
					const e = createEmbed(getMessage("command.eval.title", config.emoji.terminal), null, config.color.error, true, fields, {
						text: getMessage("command.eval.field.timeTaken", time),
					});
					return (
						await message.channel.send({ embeds: [e] }),
						message.channel.send({ files: [`./src/temp/${date}.txt`] }).then(function () {
							fs.unlinkSync(`./src/temp/${date}.txt`); // 파일 삭제
						})
					);
				}
				// 6000자 미만이면 메시지로 전송
				else {
					return await message.channel.send({ embeds: [e] });
				}
			}

			const fields = [
				{
					name: getMessage("command.eval.field.input"),
					value: "```" + lang.replace("python3", "python") + "\n" + code + "\n" + "```",
				},
				{
					name: getMessage("command.eval.field.output"),
					value: "```\n" + output.stdout + "\n```",
				},
			];
			const e = createEmbed(getMessage("command.eval.title", config.emoji.terminal), null, config.color.normal, true, fields, {
				text: getMessage("command.eval.field.timeTaken", time),
			});

			// 6000자 이상이면 output결과 파일로 전송
			if (e.length > 5999) {
				const date = new Date().getTime();
				fs.writeFileSync(`./src/temp/${date}.txt`, output.stdout, "utf8");
				const fields = [
					{
						name: getMessage("command.eval.field.input"),
						value: "```" + lang.replace("python3", "python") + "\n" + code + "\n" + "```",
					},
					{
						name: getMessage("command.eval.field.output"),
						value: getMessage("command.eval.field.fileReference", `${date}.txt`),
					},
				];
				const e = createEmbed(getMessage("command.eval.title", config.emoji.terminal), null, config.color.normal, true, fields, {
					text: getMessage("command.eval.field.timeTaken", time),
				});
				await message.channel.send({ embeds: [e] }),
					message.channel.send({ files: [`./src/temp/${date}.txt`] }).then(function () {
						fs.unlinkSync(`./src/temp/${date}.txt`); // 파일 삭제
					});
			}
			// 6000자 미만이면 메시지로 전송
			else {
				await message.channel.send({ embeds: [e] });
			}
		}
	);
};
