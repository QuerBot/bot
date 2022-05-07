import 'dotenv/config';
import fs from 'fs';
import * as controller from './controller';
import * as userService from './user/user.service';
const CronJob = require('cron').CronJob;

const data = JSON.parse(fs.readFileSync('src/assets/accounts.json'));

async function main() {
	//let agent = await controller.getUserID('example');
	await controller.sendFollowingsToDB('example');
	//await controller.getFollowings(agent);
	//let value = controller.botCache.get('rate');
	//console.log(token);
	//let date = new Date(value.reset * 1000);
	//console.log(date);
	//console.log(value);
	//await checkFollowers('example', data);

	let token = controller.botCache.take('token');
	//await controller.getFollowings(agent, { result_count: 1000 });
}

main();

//console.log(controller.getMentions(process.env.BOT_ID));

async function postJSON() {
	let userArr = [];
	for (const user of data) {
		let userObj = await controller.getUser(user.userName);
		userObj.bubble = [
			{
				id: '58e9469ba2b81e7b0837199955bf9df4',
			},
		];
		if (userObj.id) {
			userArr.push(userObj);
			console.log(`${userObj.handle} wurde zum Array hinzugefügt`);
		}
	}
	await userService.postUser(userArr);
}

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

