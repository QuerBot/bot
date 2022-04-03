import client from "./client.js";

async function getUserID(userHandle) {
	let user = await client.v2.userByUsername(userHandle);
	let id = user.data.id;
	getFollowings(id);
}

async function getFollowings(userID) {
	console.log(await client.v2.following(userID));
}

async function getMentions(botID) {
	let timeline = await client.v2.userMentionTimeline(botID, {
		max_results: 100,
	});
	let tweets = timeline.data.data;
	for (const tweet of tweets) {
		let tweetText = tweet.text;
		let tweetID = tweet.id;
		if (tweetText.includes("check")) {
			let userArr = tweetText.match(/@\w+/g).map((x) => x.substring(1));
			let getUser = userArr
				.filter((user) => user !== process.env.BOT_HANDLE)
				.toString();
			getUserID(getUser);
		}
	}
}

export { getUserID, getFollowings, getMentions };
