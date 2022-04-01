const { TwitterApi } = require("twitter-api-v2");
require("dotenv").config();

module.exports = new TwitterApi({
	apiKey: process.env.API_KEY,
	apiSecret: process.env.API_SECRET,
	accessToken: process.env.ACCESS_TOKEN,
	accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
});
