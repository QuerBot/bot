// Tweet Service for NestJS Api - All Routes
const axios = require('axios').default;
import * as userService from '../user/user.service.js';

// #region - Get Routes
export async function getNextTweet() {
	const response = await axios.get(`${process.env.BASE_URL}/tweet`);
	return response.data;
}

export async function getTweetById(id) {
	const response = await axios.get(`${process.env.BASE_URL}/tweet`, id);
	return response.data;
}
// #endregion

// #region - Post Routes
export async function queueTweet(tweet) {
	for (const user of tweet) {
		let userObj = {
			id: user.requestedUser,
		};
		await userService.postUser(userObj);
	}
	await axios.post(`${process.env.BASE_URL}/tweet`, tweet);
}
// #endregion

// #region - Update/Patch Routes
export async function doneTweet(id) {
	await axios.patch(`${process.env.BASE_URL}/tweet`, id);
}
// #endregion
