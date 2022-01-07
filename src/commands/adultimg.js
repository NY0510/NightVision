const createEmbed = require("../module/createEmbed");
const getMessage = require("../module/getMessage");
const quickEmbed = require("../module/quickEmbed");
const request = require("request");

exports.run = async (client, Discord, message, config, args) => {
	let normal;
	let soft;
	let adult;

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
		try {
			normal = body.result.normal * 100;
			soft = body.result.soft * 100;
			adult = body.result.adult * 100;
		} catch (e) {
			return await message.channel.send({
				embeds: [createEmbed(`${config.emoji.x} 이미지 분석에 실패했습니다`, "잠시 후 다시 시도해 주세요", config.color.error, true)],
			});
		}

		const data =
			getMessage("commands.adultimg.result.normal", config.emoji.cheak, normal.toFixed(1)) +
			"\n" +
			getMessage("commands.adultimg.result.soft", config.emoji.wait, soft.toFixed(1)) +
			"\n" +
			getMessage("commands.adultimg.result.adult", config.emoji.x, adult.toFixed(1));
		await message.channel.send({ embeds: [createEmbed(getMessage("commands.adultimg.title", config.emoji.warning), data, config.color.normal, true, null, null, null, args[0])] });
	});
};
