import 'dotenv/config';
import fs from 'fs';
import { removeUser } from './user/user.service';
import { checkFollowers } from './controller';

const data = JSON.parse(fs.readFileSync('src/assets/accounts.json'));

async function main() {
	//getMentions(process.env.BOT_ID);

	/* Manual Add to List 
	let userToAdd = 'example';
	addToList(userToAdd, await getUserID(userToAdd), data);
	*/

	await checkFollowers('example', data);
}

main();

async function importer() {
	const userObj = {
		rating: Math.floor(Math.random() * (20 - 0 + 1)) + 0,
		handle: process.env.EXAMPLE_USER,
	};
	const followerObj = [
		{
			id: '56022727',
		},
		{
			id: '55654644545854',
		},
	];
	await removeUser('55654644545854');
}

//importer();
