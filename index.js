const client = require("./client");
require("dotenv").config();

async function tweet() {
	await client.v2
		.tweet("This tweet was written by a bot")
		.then((val) => {
			console.log(val);
			console.log("success");
		})
		.catch((err) => {
			console.log(err);
		});
}

tweet();
