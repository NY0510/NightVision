module.exports = (client, message) => {
	if (!message.content.startsWith(client.config.prefix) || message.author.bot || message.channel.type == "dm") return;

	const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	const cmd = client.commands.get(command);
	if (!cmd) return;

	try {
		cmd.run(client, client.discord, message, client.config, args);
	} catch (error) {
		console.error(error);
		message.channel.send(`**ERROR: ${error}**`);
	}
};
