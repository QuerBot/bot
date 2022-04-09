import client from "./client.js";

async function getUserID(userHandle) {
	let user = await client.v2.userByUsername(userHandle);
	let id = user.data.id;
	return id;
}

async function getFollowings(userID) {
	return await client.v2.following(userID);
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
			let getUser = userArr.filter((user) => user !== process.env.BOT_HANDLE).toString();
			getUserID(getUser);
		}
	}
}

async function checkFollowers(userHandle, checkList) {
	const userID = await getUserID(userHandle);
	const followings = await getFollowings(userID);
	const listArray = await makeList(checkList);
	console.log(followings);
}

async function makeList(list) {
	const listArr = list.split("\r\n");
	return listArr;
}

export { getUserID, getFollowings, getMentions, makeList, checkFollowers };
