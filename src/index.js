import "dotenv/config";
import fs from "fs";
import { getMentions, checkFollowers, getUserID, addToList } from './controller';

const data = JSON.parse(fs.readFileSync('src/assets/accounts.json'));


async function main() {
	//getMentions(process.env.BOT_ID);

	/* Manual Add to List 
	let userToAdd = 'example';
	let manualUser = await getUserID(userToAdd);
	addToList(userToAdd, manualUser, data);
	*/

	await checkFollowers('example', data);
}

main();
