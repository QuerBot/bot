import 'dotenv/config';
import * as controller from './controller';
const CronJob = require('cron').CronJob;

async function test() {
	let mentions = await controller.getMentions(process.env.BOT_ID);
	await controller.builder(mentions);
}
//test();

const job = new CronJob(
	'*/10 * * * * *',
	async function () {
		let mentions = await controller.getMentions(process.env.BOT_ID);
		await controller.builder(mentions);
	},
	null,
	false
);

job.start();
