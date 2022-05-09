import 'dotenv/config';
import * as controller from './controller';
import * as userService from './user/user.service';
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
}

main();

//console.log(controller.getMentions(process.env.BOT_ID));

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
