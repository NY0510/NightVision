const createEmbed = require("../module/createEmbed");
const getMessage = require("../module/getMessage");
const quickEmbed = require("../module/quickEmbed");

exports.run = async (client, Discord, message, config, args) => {
	// 관리자 아닐때
	if (config.owners.indexOf(Number(message.author.id)) == -1) return await message.channel.send({ embeds: [quickEmbed.onlyOwner()] });

	// args 없을때
	if (!args || args.length < 1) return await message.channel.send({ embeds: [quickEmbed.noArgs()] });

	const commandName = args[0];

	if (!client.commands.has(commandName)) {
		return await message.channel.send({ embeds: [createEmbed(getMessage("command.reload.error.moduleNotExist", config.emoji.x, commandName), null, config.color.error, true)] });
	}
	delete require.cache[require.resolve(`./${commandName}.js`)];
	client.commands.delete(commandName);
	const props = require(`./${commandName}.js`);
	client.commands.set(commandName, props);
	await message.channel.send({ embeds: [createEmbed(getMessage("command.reload.success", config.emoji.cheak, commandName), null, config.color.normal, true)] });
};
