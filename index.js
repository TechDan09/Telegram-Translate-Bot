require('dotenv').config()
// const { Telegraf } = require('telegraf')
const { Composer } = require('micro-bot')
const {Translate} = require('@google-cloud/translate').v2;

const {BOT_TOKEN} = process.env
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);


// const bot = new Telegraf(BOT_TOKEN)
const bot = new Composer()


// Configuration for the client
const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

const translateText = async (text, targetLanguage) => {
	try {
		let [response] = await translate.translate(text, targetLanguage);
		return response;
	} catch (error) {
		console.log(`Error at translateText --> ${error}`);
		return 0;
	}
};

bot.start((ctx) => {
	ctx.reply('Bot started')
})

bot.command('translate', (ctx) => {
	try {
		let msg = ctx.message.reply_to_message.text;

		translateText(msg, 'en')
			.then((res) => {
				ctx.reply(res);
        console.log(res);
			})
			.catch(err => console.log(err))
	} catch (UnhandledPromiseRejectionWarning) {
		ctx.reply("Please reply to a text to translate")
		console.log("error");
	}
})

// bot.launch()
module.exports = bot

// afternoon-spire-94412
// https://afternoon-spire-94412.herokuapp.com/ | https://git.heroku.com/afternoon-spire-94412.git