import 'dotenv/config';
import fs from 'fs';
import { removeUserFromBubble } from './user/user.service';
import { sendFollowingsToDB } from './controller';

const data = JSON.parse(fs.readFileSync('src/assets/accounts.json'));

async function main() {
	//getMentions(process.env.BOT_ID);

	/* Manual Add to List 
	let userToAdd = 'example';
	addToList(userToAdd, await getUserID(userToAdd), data);
	*/

	await checkFollowers('example', data);
}

//main();

async function importer() {
	await removeUserFromBubble(process.env.EXAMPLE_ID, process.env.EXAMPLE_BUBBLE);
}

importer();
