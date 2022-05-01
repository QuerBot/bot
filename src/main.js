import 'dotenv/config';
import fs from 'fs';
import { postBubble, updateBubble, deleteBubble } from './bubble/bubble.service';
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

//main();

async function importer() {
	let bubble = {
		name: 'QuerBot-Test',
		description: 'Querbot Not Testing anymore Bubble',
	};
	await updateBubble('97088b0403c4858fb71d7a7130550608', bubble);
}

importer();
