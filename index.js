const { getUserID, getFollowings, getMentions } = require("./controller");
const client = require("./client");
require("dotenv").config();

getMentions(process.env.BOT_ID);
