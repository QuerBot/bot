import 'dotenv/config';
import * as controller from './controller';
const CronJob = require('cron').CronJob;

const job = new CronJob(
	'*/60 * * * * *',
	async function () {
		let mentions = await controller.getMentions(process.env.BOT_ID);
		await controller.builder(mentions);
	},
	null,
	false
);

job.start();
