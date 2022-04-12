import "reflect-metadata";
import "dotenv/config";
import fs from "fs";
import { getMentions, checkFollowers } from "./controller.js";

const data = JSON.parse(fs.readFileSync("./assets/accounts.json"));

//getMentions(process.env.BOT_ID);

checkFollowers("BurgerinCitizen", data);


