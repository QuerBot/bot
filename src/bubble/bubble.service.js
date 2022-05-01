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
	let bubbleExist = true; // Check for bubblename if getBubbleByName exists
	if (bubbleExist) {
		await axios.post(`${process.env.BASE_URL}/bubble`, bubble);
		return 'Bubble was successfully added';
	}
	console.log('Bubble already exists');
}

// #endregion

// #region - Patch-Routes

export async function updateBubble(bubbleid, bubble) {
	let bubbleExist = await getBubbleById(bubbleid);
	if (bubbleExist.length) {
		try {
			await axios({
				method: 'patch',
				url: `${process.env.BASE_URL}/bubble/${bubbleid}`,
				data: bubble,
			});
		} catch (e) {
			console.log(e);
		}
	}
}

// #endregion

// #region - Delete-Routes

export async function deleteBubble(id) {
	const response = await axios.delete(`${process.env.BASE_URL}/bubble/${id}`);
	return response.data;
}

// #endregion
