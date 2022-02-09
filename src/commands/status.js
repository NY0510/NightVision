exports.run = async (client, Discord, message, config, args) => {
	const si = require("systeminformation");
	cputemp = si.cpuTemperature().data["main"];
	console.log(cputemp);

	// const e = new Discord.MessageEmbed()
	// 	.setColor("#0084ff")
	// 	.setTitle("Bot Status")
	// 	.addFields(
	// 		{ name: ":ping_pong: Latency", value: `┕**\`Loading...\`**`, inline: true },
	// 		{ name: ":control_knobs: API Latency", value: `┕**\`${Math.round(client.ws.ping)}ms\`**`, inline: true },
	// 		{ name: ":clock1: Uptime", value: `┕**\`${uptime}\`**`, inline: true },
	// 		{ name: ":computer: CPU", value: `┕**\`${cpuload.(1)}\`**`, inline: true },
	// 		{ name: ":file_cabinet: Memory", value: `┕**\`${mem}\`**`, inline: true },
	// 		{ name: ":blue_book: Discord.js Version", value: `┕**\`N/A\`**`, inline: true },
	// 		{ name: ":homes: Guilds", value: `┕**\`N/A\`**`, inline: true },
	// 		{ name: ":busts_in_silhouette: Users", value: `┕**\`N/A\`**`, inline: true },
	// 		{ name: ":robot: Version", value: `**\`v${ config.version}\`**`, inline: true }
	// 	)
	// 	.setTimestamp();
	// message.channel.send({ embeds: [e] }).then(async msg => {
	// 	// si.cpuTemperature(data => {console.log(`CPU TMEP : ${data['main']}`)})
	// 	// si.currentLoad(data => {console.log(`CPU LOAD : ${data["currentLoad"]}`);});
	// 	// si.osInfo(data => {console.log(`OS: ${data["platform"]}`);});
	// 	// si.mem(data => {console.log(`MEM: ${data['used', 'total']}`);});
	// 	// si.time(data => {console.log(data);});

	// 	const e = new Discord.MessageEmbed()
	// 		.setColor("#0084ff")
	// 		.setTitle("Bot Status")
	// 		.addFields(
	// 			{ name: ":ping_pong: Latency", value: `┕**\`${msg.createdTimestamp - message.createdTimestamp}ms\`**`, inline: true },
	// 			{ name: ":control_knobs: API Latency", value: `┕**\`${Math.round(client.ws.ping)}ms\`**`, inline: true },
	// 			{ name: ":clock1: Uptime", value: `┕**\`${uptime}\`**`, inline: true },
	// 			{ name: ":computer: CPU", value: `┕**\`${cpuload.toFixed(1)}\`**`, inline: true },
	// 			{ name: ":file_cabinet: Memory", value: `┕**\`${mem}\`**`, inline: true },
	// 			{ name: ":blue_book: Discord.js Version", value: `┕**\`N/A\`**`, inline: true },
	// 			{ name: ":homes: Guilds", value: `┕**\`N/A\`**`, inline: true },
	// 			{ name: ":busts_in_silhouette: Users", value: `┕**\`N/A\`**`, inline: true },
	// 			{ name: ":robot: Version", value: `**\`v${ config.version}\`**`, inline: true }
	// 		)
	// 		.setTimestamp();
	// 	msg.edit({ embeds: [e] });
	// });
};
