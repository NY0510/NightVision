const createEmbed = require("../module/createEmbed");
const getMessage = require("../module/getMessage");
const quickEmbed = require("../module/quickEmbed");
const fetch = require("cross-fetch");

exports.run = async (client, Discord, message, config, args) => {
	// args 없을때
	if (!args || args.length < 1) return await message.channel.send({ embeds: [quickEmbed.noArgs()] });
	const ip = args[0];

	// prettier-ignorse
	// ip 유효성 검사
	if (
		!ip.match(
			/^^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/
		)
	)
		return await message.channel.send({ embeds: [createEmbed(getMessage("command.ipinfo.error.invalidIP", config.emoji.x, ip), null, config.color.error, true)] });

	const request = await fetch(`https://ipinfo.io/${ip}?token=${config.api.ipinfo}`);
	const json = await request.json();

	if (json.country == undefined && json.country == undefined && json.region == undefined && json.city == undefined && json.org == undefined && json.timezone == undefined) {
		return await message.channel.send({ embeds: [createEmbed(getMessage("command.ipinfo.error.invalidIP", config.emoji.x, ip), null, config.color.error, true)] });
	}

	const fields = [
		{
			name: getMessage("command.ipinfo.field.ip"),
			value: getMessage("global.embed.prettyValue", json.ip),
			inline: true,
		},
		{
			name: getMessage("command.ipinfo.field.country"),
			value: getMessage("global.embed.prettyValue", json.country),
			inline: true,
		},
		{
			name: getMessage("command.ipinfo.field.region"),
			value: getMessage("global.embed.prettyValue", `${json.region} ${json.city}`),
			inline: true,
		},
		{
			name: getMessage("command.ipinfo.field.loc"),
			value: getMessage("global.embed.prettyValue", json.loc.replace(",", ", ")),
			inline: true,
		},
		{
			name: getMessage("command.ipinfo.field.org"),
			value: getMessage("global.embed.prettyValue", json.org),
			inline: true,
		},
		{
			name: getMessage("command.ipinfo.field.timezone"),
			value: getMessage("global.embed.prettyValue", json.timezone),
			inline: true,
		},
	];
	await message.channel.send({ embeds: [createEmbed(getMessage("command.ipinfo.title"), null, config.color.normal, true, fields)] });
};
