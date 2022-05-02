import 'dotenv/config';
import fs from 'fs';
import { sendFollowingsToDB } from './controller';

const data = JSON.parse(fs.readFileSync('src/assets/accounts.json'));

async function main() {
	//getMentions(process.env.BOT_ID);
	/* Manual Add to List 
	let userToAdd = 'example';
	addToList(userToAdd, await getUserID(userToAdd), data);
	*/
	//console.log(data[0]);
	//await sendFollowingsToDB('example');
	//await checkFollowers('example', data);
}

main();

