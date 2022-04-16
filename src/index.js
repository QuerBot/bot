import "dotenv/config";
import fs from "fs";
import { getMentions, checkFollowers, getUserID, addToList } from './controller';

const data = JSON.parse(fs.readFileSync('src/assets/accounts.json'));

//getMentions(process.env.BOT_ID);

checkFollowers('example', data);

//addToList("example", await getUserID("example"), data); //manual add to list
