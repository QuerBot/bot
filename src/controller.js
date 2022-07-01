import client from './client';
import * as tweetService from './tweet/tweet.service';
import * as userService from './user/user.service';

async function getUserID(userHandle) {
	let user = await client.v2.userByUsername(userHandle);
	user = user.data;
	if (!user) {
		return false;
	}
	return user.id;
}

export async function getMentions(botID) {
	let timeline = await client.v2.userMentionTimeline(botID, {
		max_results: 100,
	});

	let tweets = timeline.data.data;
	return tweets;
}

async function getHandleFromTweet(tweet) {
	if (tweet === undefined) {
		return false;
	}
	let text = tweet.toLowerCase();
	let checkWord = 'check';
	if (!text.includes(checkWord)) {
		return false;
	}
	let handle = text.split('check ')[1];
	if (handle === undefined) {
		return false;
	}
	let isValid = /^@?(\w){1,15}$/.test(handle);
	if (!isValid) {
		return false;
	}
	if (handle.includes('@')) {
		handle = handle.split('@').pop();
	}
	return handle;
}

async function addUserToDB(userId) {
	let userObj = {};
	let handle = await client.v2.user(userId);
	handle = handle.data.username;
	userObj.id = userId;
	userObj.handle = handle;
	userObj.rating = 0;
	userService.postUser(userObj);
}

export async function builder(tweets) {
	let tweetArr = [];
	for (const tweet of tweets) {
		let checkTweet = await tweetService.getTweetById(tweet.id);
		if (checkTweet) {
			continue;
		}
		let tweetObj = {};
		tweetObj.answered = 0;
		tweetObj.tweetID = tweet.id;
		let handle = await getHandleFromTweet(tweet.text);
		if (!handle) {
			continue;
		}
		let userID = await getUserID(handle);
		if (!userID) {
			continue; // If user doesn't exist
		}
		tweetObj.requestedUser = userID;
		tweetArr.push(tweetObj);
		let userExist = await userService.getUserById(userID);
		if (userExist.length) {
			continue;
		}
		await addUserToDB(userID);
	}
	if (tweetArr.length) {
		tweetService.queueTweet(tweetArr);
	} else {
		console.log('Tick - not sent');
	}
}
