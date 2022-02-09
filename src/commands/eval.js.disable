const createEmbed = require("../module/createEmbed");
const getMessage = require("../module/getMessage");
const quickEmbed = require("../module/quickEmbed");
const util = require("../module/util");
const fs = require("fs");

let startTime;

const sendEvalResult = async (config, message, input, output, type) => {
	let e;
	let fields = [
		{
			name: getMessage("command.eval.field.input"),
			value: `\`\`\`js\n${input}\n\`\`\``,
		},
		{
			name: getMessage("command.eval.field.output"),
			value: `\`\`\`js\n${output}\n\`\`\``,
		},
	];

	if (type == "error") {
		fields[1].name = fields[1].name + " **(Error)**";
		e = createEmbed(getMessage("command.eval.title", config.emoji.terminal), null, config.color.error, true, fields, { text: getMessage("command.eval.field.timeTaken", 1) });
	} else {
		e = createEmbed(getMessage("command.eval.title", config.emoji.terminal), null, config.color.normal, true, fields, { text: getMessage("command.eval.field.timeTaken", 1) });
	}

	if (output.length >= 1024) {
		const date = new Date().getTime();
		fs.writeFileSync(`./src/temp/${date}.txt`, output, "utf8");
		e.fields[1].value = getMessage("command.eval.field.fileReference", `${date}.txt`);
		e.footer["text"] = getMessage("command.eval.field.timeTaken", new Date() - startTime);

		return (
			await message.reply({ embeds: [e] }),
			await message.channel.send({ files: [`./src/temp/${date}.txt`] }).then(function () {
				fs.unlinkSync(`./src/temp/${date}.txt`);
			})
		);
	} else {
		e.footer["text"] = getMessage("command.eval.field.timeTaken", new Date() - startTime);
		return await message.reply({ embeds: [e] });
	}
};

exports.run = async (client, Discord, message, config, args) => {
	if (config.owners.indexOf(Number(message.author.id)) == -1) return await message.channel.send({ embeds: [quickEmbed.onlyOwner()] });
	if (!args || args.length < 1) return await message.channel.send({ embeds: [quickEmbed.noArgs()] });

	startTime = new Date();
	try {
		const evaled = eval(args.join(" "));
		const cleaned = await util.clean(evaled, client);

		sendEvalResult(config, message, args.join(" "), cleaned, "success");
	} catch (err) {
		sendEvalResult(config, message, args.join(" "), err.message, "error");
	}
};
