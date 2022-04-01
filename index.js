const client = require("./client");

/* async function tweet() {
	const appOnlyClient = await client.appLogin();

	appOnlyClient.v1
		.tweet("This tweet was written by a bot")
		.then((val) => {
			console.log(val);
			console.log("success");
		})
		.catch((err) => {
			console.log(err);
		});
}

tweet(); */

async function testTweet() {
	await client.v2.tweet("Hi, I am building a twitter bot!");
}

testTweet();
