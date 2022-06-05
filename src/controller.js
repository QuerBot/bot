import client from './client';
import * as tweetService from './tweet/tweet.service';

async function getUserID(userHandle) {
	let user = await client.v2.userByUsername(userHandle);
	user = user.data;
	if (!user) {
		return console.log(`${userHandle} ist entweder falsch, gesperrt oder existiert nicht.`);
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
	let text = tweet.toLowerCase();
	let checkWord = 'check';
	if (!text.includes(checkWord)) {
		return false;
	}
	let handle = text.slice(text.indexOf(checkWord) + checkWord.length + 1);
	if (handle.includes('@')) {
		handle = handle.split('@').pop();
	}
	return handle;
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
		tweetObj.requestedUser = [
			{
				id: userID,
			},
		];

		tweetArr.push(tweetObj);
	}
	if (tweetArr.length) {
		tweetService.queueTweet(tweetArr);
		console.table(tweetArr);
	} else {
		console.log('Tick - not sent');
	}
}
