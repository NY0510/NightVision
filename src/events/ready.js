module.exports = client => {
	const statusType = client.config.status.type;
	const statusInterval = client.config.status.interval;

	console.log(`\nLogged in as ${client.user.tag}`);
	console.log(`On ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users\n`);

	setInterval(() => {
		const statusMessages = [
			`${client.config.prefix}help    |    ${client.guilds.cache.size} 서버`,
			`${client.config.prefix}help    |    ${client.users.cache.size} 사용자`,
			`${client.config.prefix}help    |    ${client.config.developer} 개발`,
		];
		const index = Math.floor(Math.random() * statusMessages.length);
		client.user.setActivity(statusMessages[index], { type: statusType });
	}, statusInterval);
};
