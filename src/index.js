import "reflect-metadata";
import "dotenv/config";
import fs from "fs";
import { getUserID, getFollowings, getMentions, makeList, checkFollowers } from "./controller.js";

//getMentions(process.env.BOT_ID);
let accounts = fs.readFileSync("./assets/accounts.txt", "utf-8");

checkFollowers("exampleAccount", accounts);

