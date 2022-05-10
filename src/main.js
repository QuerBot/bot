import 'dotenv/config';
import * as controller from './controller';
import * as userService from './user/user.service';
import * as tweetService from './tweet/tweet.service';
import * as tweetBuilder from './tweet/tweet.builder';
const CronJob = require('cron').CronJob;

async function main() {
	//let agent = await controller.getUserID('example');
	//await controller.sendFollowingsToDB('example');
	//await controller.getFollowings(agent);
	//let value = controller.botCache.get('rate');
	//let date = new Date(value.reset * 1000);
	//await checkFollowers('example', data);
	//let token = controller.botCache.take('token');
	//await controller.getFollowings(agent, { result_count: 1000 });

	let mentions = await tweetBuilder.getMentions(process.env.BOT_ID);
	await tweetBuilder.builder(mentions);
}

main();

//postJSON();

const job = new CronJob(
	'*/10 * * * * *',
	function () {
		/* let token = controller.botCache.take('token');
		token = token.next_token;
		await controller.getFollowings(agent, token); */
	},
	null,
	false
);

//job.start();
