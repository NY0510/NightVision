const createEmbed = require("../module/createEmbed");
const getMessage = require("../module/getMessage");
const quickEmbed = require("../module/quickEmbed");
const request = require("request");

exports.run = async (client, Discord, message, config, args) => {
	if (!args || args.length < 1) return await message.channel.send({ embeds: [quickEmbed.noArgs()] });

	// 확장자 체크
	if (!args[0].endsWith("png") && !args[0].endsWith("jpg") && !args[0].endsWith("jpeg")) {
		const ext = args[0].substr(args[0].lastIndexOf(".") + 1).toUpperCase();
		return await message.channel.send({
			embeds: [
				createEmbed(
					getMessage("commands.adultimg.error.notSupportImgUrl.title", config.emoji.x, ext),
					getMessage("commands.adultimg.error.notSupportImgUrl.discription"),
					config.color.error,
					true
				),
			],
		});
	}

	const options = {
		uri: "https://dapi.kakao.com/v2/vision/adult/detect",
		method: "POST",
		json: true,
		headers: {
			Authorization: `KakaoAK ${config.api.adult_img}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: `image_url=${args[0]}`,
	};
	request.post(options, async function (error, response, body) {
		console.log(body);
		const normal = body.result.normal * 100;
		const soft = body.result.soft * 100;
		const adult = body.result.adult * 100;

		const data =
			getMessage("commands.adultimg.result.normal", config.emoji.cheak, normal.toFixed(1)) +
			"\n" +
			getMessage("commands.adultimg.result.soft", config.emoji.wait, soft.toFixed(1)) +
			"\n" +
			getMessage("commands.adultimg.result.adult", config.emoji.x, adult.toFixed(1));
		await message.channel.send({ embeds: [createEmbed(getMessage("commands.adultimg.title", config.emoji.warning), data, config.color.normal, true, null, null, null, args[0])] });
	});
};
