import "reflect-metadata";
import "dotenv/config";
import fs from "fs";
import { getMentions, checkFollowers, getUserID, addToList } from "./controller.js";

const data = JSON.parse(fs.readFileSync("./assets/accounts.json"));

//getMentions(process.env.BOT_ID);

checkFollowers("TiffaniCologne", data);

//addToList("example", await getUserID("example"), data); //manual add to list
