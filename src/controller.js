import client from "./client.js";

async function getUserID(userHandle) {
	let user = await client.v2.userByUsername(userHandle);
	let id = user.data.id;
	return id;
}

async function getFollowings(userID) {
	const followings = await client.v2.following(userID, { asPaginator: true });
	let followingList = [];
	for await (const follows of followings) {
		followingList.push(follows);
	}
	return followingList;
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
	let positives = 0;
	let length = followings.length;
	for await (const follow of followings) {
		let getHandle = follow.username;
		getHandle = getHandle.toLowerCase();
		if (listArray.includes(getHandle)) {
			positives++;
		}
	}

	let percentage = positives / (length / 100);

	console.log(`${positives} von ${length} Accounts (${percentage}%) denen ${userHandle} folgt weisen Querdenkernähe auf oder sind Querdenker.`);
}

async function makeList(list) {
	const listArr = list.split("\r\n");
	return listArr;
}

export { getUserID, getFollowings, getMentions, makeList, checkFollowers };
