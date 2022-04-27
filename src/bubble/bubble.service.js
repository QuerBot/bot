// Bubble Service for NestJS Api - All Routes
const axios = require('axios').default;

// #region - Get-Routes

async function getBubble() {
	const response = await axios.get(`${process.env.BASE_URL}/bubble`);
	return response.data;
}

export { getBubble };

async function getBubbleById(id) {
	// TO DO
}

export { getBubbleById };

async function getBubbleMembers(id) {
	// TO DO
}

export { getBubbleMembers };

async function getBubbleMostFollowedUsers(id) {
	// TO DO
}

export { getBubbleMostFollowedUsers };

// #endregion

// #region - Post-Routes

async function postBubble(bubble) {
	// TO DO
}

export { postBubble };

// #endregion

// #region - Patch-Routes

async function updateBubble(bubble) {
	// TO DO
}

export { updateBubble };

// #endregion

// #region - Delete-Routes

async function deleteBubble(id) {
	// TO DO
}

export { deleteBubble };

// #endregion
