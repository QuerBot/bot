// Tweet Service for NestJS Api - All Routes
const axios = require('axios').default;
import * as userService from '../user/user.service.js';

// #region - Get Routes
export async function getTweetById(id) {
	const response = await axios.get(`${process.env.BASE_URL}/tweet/${id}`);
	return response.data;
}
// #endregion

// #region - Post Routes
export async function queueTweet(tweets) {
	await axios.post(`${process.env.BASE_URL}/tweet`, tweets);
}
// #endregion
