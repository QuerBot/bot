import fs from "fs";
const axios = require('axios').default;
import client from './client';
import * as bubbleService from './bubble/bubble.service';
import * as userService from './user/user.service';
const NodeCache = require('node-cache');
export const botCache = new NodeCache({ checkperiod: 900 });

async function getUserID(userHandle) {
	let user = (await client.v2.userByUsername(userHandle)).data;
	if (!user) {
		return console.log(`${userHandle} ist entweder falsch, gesperrt oder existiert nicht.`);
	}
	return user.id;
}

async function sendFollowingsToDB(handle) {
	const id = await getUserID(handle);
	const followings = await getFollowings(id);
	let userObj = {};
	userObj.id = `${id}`;
	userObj.handle = handle;
	userObj.bubble = [
		{
			id: '58e9469ba2b81e7b0837199955bf9df4',
		},
	];
	await userService.postUser([userObj]);
	userObj.follows = [];
	let followingArray = [];
	for (const following of followings) {
		let followingObj = {};
		followingObj.id = following.id;
		followingObj.handle = following.username;
		followingArray.push(followingObj);

		let followObj = {};
		followObj.id = following.id;
		userObj.follows.push(followObj);
	}
	await userService.postUser(followingArray);
	await userService.updateFollowings(id, userObj.follows);
}

async function getFollowings(userID) {
	const followings = await client.v2.following(userID, {
		asPaginator: true,
		max_results: 1000,
	});

	let rateLimit = followings._rateLimit;
	botCache.set('rate', rateLimit);

	let followingList = [];
	for await (const follows of followings._realData.data) {
		followingList.push(follows);
	}

	return followingList;
}

async function getFollowers(userID) {
	const followers = await client.v2.followers(userID, {
		asPaginator: true,
		max_results: 1000,
	});

	let followerList = [];
	for await (const follower of followers) {
		followerList.push(follower);
	}

	return followerList;
}

async function getMentions(botID) {
	let timeline = (
		await client.v2.userMentionTimeline(botID, {
			max_results: 100,
		})
	).data;

	let tweets = timeline.data;

	for (const tweet of tweets) {
		let tweetText = tweet.text;
		if (!tweetText.includes('check')) {
			continue;
		}

		let userArr = tweetText.match(/@\w+/g).map((x) => x.substring(1));
		let getUser = userArr.filter((user) => user !== process.env.BOT_HANDLE).toString();
		getUserID(getUser);
	}
}

async function checkFollowers(userHandle, checkList) {
	const userID = await getUserID(userHandle);
	const userFollowings = await getFollowings(userID);
	let positives = 0;
	let followingsLength = userFollowings.length;
	let percentage = 0;

	for await (const follow of userFollowings) {
		let getFollow = follow.username.toLowerCase();
		let userDoesFollow = checkList.filter((userObj) => userObj.userName === getFollow).length;
		if (!userDoesFollow) {
			continue;
		}

		positives++;
		console.log(getFollow);
	}

	percentage = positives / (followingsLength / 100);
	console.log('- - - - - - - - - - - - - - - - - - - - - - - -');
	console.log('- - - - - - - - - - - - - - - - - - - - - - - -');
	console.log('- - - - - - - - - - - - - - - - - - - - - - - -');
	console.log('- - - - - - - - - - - - - - - - - - - - - - - -');
	console.log(`Mindestens ${positives} von ${followingsLength} Accounts (${percentage}%) denen ${userHandle} folgt,`);
	console.log('weisen Querdenkernähe auf oder sind Querdenker.');
	console.log('- - - - - - - - - - - - - - - - - - - - - - - -');
	console.log('- - - - - - - - - - - - - - - - - - - - - - - -');
	console.log('- - - - - - - - - - - - - - - - - - - - - - - -');
	console.log('- - - - - - - - - - - - - - - - - - - - - - - -');

	let requiredPercentage = -1;
	if (followingsLength <= 10) {
		requiredPercentage = 50;
	} else if (followingsLength <= 20) {
		requiredPercentage = 25;
	} else if (followingsLength <= 50) {
		requiredPercentage = 15;
	} else {
		if (positives >= 15 || percentage >= 10) {
			await addToList(userHandle, userID, checkList);
		} else {
			requiredPercentage = 10;
		}
	}

	if (requiredPercentage == -1) return;
	await checkTreshhold(requiredPercentage, percentage, userHandle, userID, checkList);
}

async function checkTreshhold(requiredPercentage, percentage, userHandle, userID, checkList) {
	if (percentage >= requiredPercentage) {
		return await addToList(userHandle, userID, checkList);
	}

	await threshholdNotReachedMsg(userHandle);
}

async function threshholdNotReachedMsg(userHandle) {
	console.log(`${userHandle} folgt zu wenigen querdenkernahen/Querdenker Accounts und wird daher nicht zur Liste hinzugefügt`);
}

async function addToList(userHandle, userID, list) {
	let checkUserHandle = list.filter((userObj) => userObj.userName === userHandle.toLowerCase()).length;
	let checkUserID = list.filter((userObj) => userObj.userID === parseInt(userID)).length;

	if (checkUserHandle !== 0 || checkUserID !== 0) {
		console.log(`${userHandle} mit der ID ${userID} ist schon Teil der Liste und wurde nicht hinzugefügt`);
		return;
	}

	let userList = list;
	let userObj = await makeUserObject(userHandle, userID);
	userList.push(userObj);
	let jsonContent = JSON.stringify(userList);
	fs.writeFile('src/assets/accounts.json', jsonContent, 'utf-8', function (e) {
		if (e) {
			console.log(e);
			return;
		}
		console.log(`${userObj.userName} mit der ID ${userObj.userID} wurde erfolgreich zur Liste hinzugefügt`);
	});
}

async function makeUserObject(userName, userID) {
	return {
		userID: parseInt(userID),
		userName: userName.toLowerCase(),
	};
}

export { getMentions, checkFollowers, getUserID, addToList, getFollowings, sendFollowingsToDB };
