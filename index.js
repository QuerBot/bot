import "reflect-metadata";
import "dotenv/config";
import { getMentions } from "./src/controller.js";

getMentions(process.env.BOT_ID);
