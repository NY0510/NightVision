const createEmbed = require("../module/createEmbed");
const getMessage = require("../module/getMessage");

exports.run = async (client, Discord, message, config, args) => {
	const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
	console.log(member);
};
