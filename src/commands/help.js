const createEmbed = require("../module/createEmbed");
const getMessage = require("../module/getMessage");
const helpData = require("../data/help.json");

exports.run = async (client, Discord, message, config, args) => {
	const prefix = config.prefix;
	let description = "";
	// 부분 도움말 (명령어 하나하나마다)
	if (args[0]) {
		const find = helpData.find(help => help.name.split(" ")[0] === args[0]); // helplist에서 args 검색
		if (find) {
			const fullDescription = find.fullDescription.replace("${prefix}", prefix);
			const e = createEmbed(getMessage("command.help.moreInformation.title", args[0]), fullDescription, config.color.normal, true);
			return message.channel.send({ embeds: [e] });
		} else {
			return message.channel.send({
				embeds: [
					createEmbed(
						getMessage("command.help.error.commandNotExist.title", config.emoji.x, args[0]),
						getMessage("command.help.error.commandNotExist.description", prefix),
						config.color.error,
						true
					),
				],
			});
		}
	}

	let fields = [];

	for (let i = 0; i < helpData.length; i++) {
		const jsonObject = {
			name: `${prefix + helpData[i].name}`.replaceAll("(", "**(").replaceAll(")", ")**"),
			value: helpData[i].shortDescription,
		};
		fields.push(jsonObject);

		// description += `• **\`${prefix + helpData[i].name}\` -** ${helpData[i].shortDescription}\n`;
	}
	fields.push({ name: "\u200B", value: getMessage("command.help.inviteLink", client.user.id) + "\n" + getMessage("command.help.moreInformation", prefix) });

	const e = createEmbed(
		getMessage("command.help.title"),
		null,
		// getMessage("command.help.moreInformation", prefix) + description + getMessage("command.help.inviteLink", client.user.id),
		config.color.normal,
		true,
		fields
	);
	await message.channel.send({ embeds: [e] });
};
