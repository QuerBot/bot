import 'dotenv/config';
import fs from 'fs';
import * as controller from './controller';
const CronJob = require('cron').CronJob;

const data = JSON.parse(fs.readFileSync('src/assets/accounts.json'));

async function main() {
	//getMentions(process.env.BOT_ID);
	/* Manual Add to List 
	let userToAdd = 'example';
	addToList(userToAdd, await getUserID(userToAdd), data);
	*/
	//console.log(data[0]);
	let agent = await controller.getUserID('example');
	//await controller.getFollowings('92773600');
	await controller.getFollowings(agent);
	let value = controller.botCache.get('rate');
	let date = new Date(value.reset * 1000);
	//console.log(date);
	//console.log(value);
	//await checkFollowers('example', data);
}

main();

const job = new CronJob(
	'* * * * * *',
	function () {
		console.log('You will see this message every second');
	},
	null,
	false,
);

//job.start();

