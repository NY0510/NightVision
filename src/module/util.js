// 텍스트에서 멘션 / 토큰 제거
module.exports.clean = async function (text, client) {
	if (text && text.constructor.name == "Promise") text = await text;
	if (typeof text !== "string") text = require("util").inspect(text, { depth: 1 });
	text = text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	text = text.replaceAll(client.token, "[REDACTED]");
	return text;
};
