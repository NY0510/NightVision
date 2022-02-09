const outputMessage = require("../data/message.json");

module.exports = function (key, ...args) {
	let value = outputMessage[key];
	for (let i = 0; i < args.length; i++) {
		value = value.replaceAll("${" + i + "}", args[i]);
	}
	return value;
};
