const Discord = require("discord.js");
const config = require("./src/data/config.json");
const fs = require("fs");

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
client.commands = new Discord.Collection();
client.discord = Discord;
client.config = config;

fs.readdir("./src/events/", (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		const event = require(`./src/events/${file}`);
		let eventName = file.split(".")[0];
		console.log(`Loaded Event - ${eventName}`);
		client.on(eventName, event.bind(null, client));
	});
});

fs.readdir("./src/commands/", (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith(".js")) return;
		let props = require(`./src/commands/${file}`);
		let commandName = file.split(".")[0];
		console.log(`Loaded Command - ${commandName}`);
		client.commands.set(commandName, props);
	});
});

client.login(config.token);
