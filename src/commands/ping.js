const { MessageEmbed } = require("discord.js");
const getMessage = require("../module/getMessage");

exports.run = async (client, Discord, message, config, args) => {
	const e = createEmbed(null, getMessage("command.ping.loadingLatency"), config.color.normal); // 핑 측정중 임베드

	message.channel.send({ embeds: [e] }).then(async msg => {
		const botLatency = msg.createdTimestamp - message.createdTimestamp;
		const apiLatency = Math.round(client.ws.ping);
		const data = getMessage("command.ping.botLatency", botLatency) + "\n" + getMessage("command.ping.apiLatency", apiLatency);
		await msg.edit({ embeds: [new MessageEmbed().setTitle(getMessage("command.ping.pong")).setDescription(data).setColor(config.color.normal).setTimestamp()] });
	});
};
