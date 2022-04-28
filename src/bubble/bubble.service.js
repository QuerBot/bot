// Bubble Service for NestJS Api - All Routes
const axios = require('axios').default;

// #region - Get-Routes

export async function getBubble() {
	const response = await axios.get(`${process.env.BASE_URL}/bubble`);
	return response.data;
}

export async function getBubbleById(id) {
	const response = await axios.get(`${process.env.BASE_URL}/bubble/${id}`);
	return response.data;
}

export async function getBubbleMembers(id) {
	const response = await axios.get(`${process.env.BASE_URL}/bubble/${id}/members`);
	return response.data;
}

export async function getBubbleMostFollowedUsers(id) {
	const response = await axios.get(`${process.env.BASE_URL}/bubble/${id}/mostFollowed`);
	return response.data;
}

// #endregion

// #region - Post-Routes

export async function postBubble(bubble) {
	// TO DO
}

// #endregion

// #region - Patch-Routes

export async function updateBubble(bubble) {
	// TO DO
}

// #endregion

// #region - Delete-Routes

export async function deleteBubble(id) {
	// TO DO
}

// #endregion
