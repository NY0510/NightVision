const createEmbed = require("../module/createEmbed");
const getMessage = require("../module/getMessage");
const quickEmbed = require("../module/quickEmbed");
const request = require("request");

exports.run = async (client, Discord, message, config, args) => {
	// args 없을때
	if (!args || args.length < 1) return await message.channel.send({ embeds: [quickEmbed.noArgs()] });
	if (args.length == 1) args[1] = 10;

	const length = args[args.length - 1];
	args.pop(); // 배열에서 마지막 요소 제거
	let text = args.join(" "); // 배열 문자열로

	const options = {
		uri: "https://main-ko-gpt2-scy6500.endpoint.ainize.ai/generate",
		method: "POST",
		body: `text=${text}&length=${length}`,
		json: true,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	};
	request.post(options, async function (error, response, body) {
		const output = body[0];
		const fields = [
			{
				name: getMessage("command.kogpt2.field.input"),
				value: "**```\n" + text + "\n```**",
			},
			{
				name: getMessage("command.kogpt2.field.output"),
				value: "**```\n" + output + "\n```**",
			},
		];
		const e = createEmbed(getMessage("command.kogpt2.title"), null, config.color.normal, true, fields);
		await message.channel.send({ embeds: [e] });
	});
};
