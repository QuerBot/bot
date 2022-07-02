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
	console.log('- - - - - - - -  - - Builder Called - - - - - - - -  - -');
	let tweetArr = [];
	let userArr = [];
	for (const tweet of tweets) {
		let tweetObj = {};
		let userObj = {};
		tweetObj.answered = 0;
		tweetObj.tweetID = tweet.id;
		let handle = await getHandleFromTweet(tweet.text);
		if (!handle) {
			console.log(handle, 'handle ist fehlerhaft');
			continue;
		}
		let userID = await getUserID(handle);
		if (!userID) {
			console.log('user existiert nicht');
			continue; // If user doesn't exist
		}
		tweetObj.requestedUser = userID;
		tweetArr.push(tweetObj);
		let userExist = await userService.getUserById(userID);
		if (userExist.length) {
			console.log('user schon in der DB');
			continue;
		}
		userObj.id = userID;
		userObj.handle = handle;
		userObj.rating = 0;
		userArr.push(userObj);
		let checkTweet = await tweetService.getTweetById(tweet.id);
		if (checkTweet) {
			console.log(tweet.id, 'tweet already in db!');
			continue;
		}
	}
	console.table(tweetArr);
	console.table(userArr);
	if (tweetArr.length) {
		console.log('Array wird an DB gesendet:');
		await tweetService.queueTweet(tweetArr);
		if (userArr.length) {
			await userService.postUser(userArr);
		}
	} else {
		console.log('Tick - not sent');
	}
}
