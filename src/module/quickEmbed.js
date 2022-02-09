const createEmbed = require("../module/createEmbed");
const getMessage = require("../module/getMessage");
const config = require("../data/config.json");

module.exports.onlyOwner = function () {
	return createEmbed(getMessage("error.permission.onlyOwner.title", config.emoji.x), getMessage("error.permission.onlyOwner.description"), config.color.error, true);
};

module.exports.noArgs = function () {
	return createEmbed(getMessage("error.command.missingArgument.title", config.emoji.x), getMessage("error.command.missingArgument.description"), config.color.error, true);
};
