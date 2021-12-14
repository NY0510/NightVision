const createEmbed = require("../module/createEmbed");
const getMessage = require("../module/getMessage");

exports.run = async (client, Discord, message, config, args) => {
	const e = createEmbed(null, getMessage("command.ping.loadingLatency"), config.color.normal); // 핑 측정중 임베드

	message.channel.send({ embeds: [e] }).then(async msg => {
		const botLatency = msg.createdTimestamp - message.createdTimestamp;
		const apiLatency = Math.round(client.ws.ping);
		const data = getMessage("command.ping.botLatency", botLatency) + "\n" + getMessage("command.ping.apiLatency", apiLatency);
		const e = createEmbed(getMessage("command.ping.pong"), data, config.color.normal, true); // 핑 측정완료 임베드
		await msg.edit({ embeds: [e] });
	});
};
