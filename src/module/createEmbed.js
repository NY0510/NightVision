const { MessageEmbed } = require("discord.js");

// prettier-ignore
module.exports = function (title, description, color, timestamp, fields, footer, image, thumbnail, url, author) {
	const embed = new MessageEmbed()
	if (title) {embed.setTitle(title);}
	if (url) {embed.setURL(url);}
	if (author) {embed.setAuthor(author.name, author.image, author.url);}
	if (color) {embed.setColor(color);}
	if (description) {embed.setDescription(description);}
	if (footer) {embed.setFooter(footer.text, footer.image);}
	if (image) {embed.setImage(image);}
	if (thumbnail) {embed.setThumbnail(thumbnail);}
	if (fields) {embed.addFields(fields);}
	if (timestamp) {embed.setTimestamp();}
	return embed;
};
