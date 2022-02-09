const { MessageEmbed } = require("discord.js");
const getMessage = require("../module/getMessage");

exports.run = async (client, Discord, message, config, args) => {
	const member = message.mentions.members.first() || message.author;

	const e = new MessageEmbed().setTitle(`${member.tag}'s Information`).setColor(member.color).setThumbnail(member.displayAvatarURL());
};
