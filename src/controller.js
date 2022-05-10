import client from './client';
import * as bubbleService from './bubble/bubble.service';
import * as userService from './user/user.service';
const NodeCache = require('node-cache');
export const botCache = new NodeCache({ checkperiod: 900 });

export async function getUserID(userHandle) {
	let user = await client.v2.userByUsername(userHandle);
	user = user.data;
	if (!user) {
		return console.log(`${userHandle} ist entweder falsch, gesperrt oder existiert nicht.`);
	}
	return user.id;
}

export async function getUser(userHandle) {
	let user = await client.v2.userByUsername(userHandle);
	user = user.data;
	if (!user) {
		return console.log(`${userHandle} ist entweder falsch, gesperrt oder existiert nicht.`);
	}
	let userObj = {};
	userObj.id = user.id;
	userObj.handle = user.username;
	return userObj;
}

export async function sendFollowingsToDB(handle) {
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

export async function getFollowings(userID, token) {
	let options = {};
	if (token === undefined) {
		token = {};
	}
	if (token.next_token) {
		options = {
			asPaginator: true,
			max_results: 1000,
			pagination_token: token.next_token,
		};
	} else {
		options = {
			asPaginator: true,
			max_results: 1000,
		};
	}

	const followings = await client.v2.following(userID, options);

	//console.log(followings);

	let rateLimit = followings._rateLimit;
	let nextToken = followings._realData.meta;
	botCache.set('rate', rateLimit);
	botCache.set('token', nextToken);

	let followingList = [];
	for (const follows of followings._realData.data) {
		followingList.push(follows);
	}
	return followingList;
	/*for await (const follows of followings) {
		followingList.push(follows);
	}*/

	//return followingList;
}

export async function getFollowers(userID) {
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

export async function checkFollowers(userHandle, checkList) {
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

export async function checkTreshhold(requiredPercentage, percentage, userHandle, userID, checkList) {
	if (percentage >= requiredPercentage) {
		return await addToList(userHandle, userID, checkList);
	}

	await threshholdNotReachedMsg(userHandle);
}

export async function threshholdNotReachedMsg(userHandle) {
	console.log(`${userHandle} folgt zu wenigen querdenkernahen/Querdenker Accounts und wird daher nicht zur Liste hinzugefügt`);
}

export async function addToList(userHandle, userID, list) {
	// TODO
}
