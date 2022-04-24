const axios = require('axios').default;

async function getUser() {
	const response = await axios.get(`${process.env.BASE_URL}/user`);
	return response.data;
}
export { getUser };

async function getUserById(userid) {
	const response = await axios.get(`${process.env.BASE_URL}/user/${userid}`);
	return response.data;
}

export { getUserById };

async function getUserFollowings(userid) {
	const response = await axios.get(`${process.env.BASE_URL}/user/${userid}/followings`);
	return response.data;
}

export { getUserFollowings };

async function getUserFollowers(userid) {
	const response = await axios.get(`${process.env.BASE_URL}/user/${userid}/followers`);
	return response.data;
}

export { getUserFollowers };

async function getUserHandle(userid) {
	const response = await axios.get(`${process.env.BASE_URL}/user/${userid}/handle`);
	return response.data;
}

export { getUserHandle };

async function postUser(user) {
	let userExist = await getUserById(user[0].id);
	if (userExist.length) {
		await axios.post(`${process.env.BASE_URL}/user`, user);
	}
	console.log('User already exists in database send to updateFollowings/updateFollowers/updateBubble instead');
}

export { postUser };

async function addUserToBubble(userid, bubbleid) {
	let userExist = await getUserById(userid);
	if (userExist.length) {
		userExist = userExist[0];
		let getBubbles = userExist.bubble;
		if (!getBubbles.find((bubble) => bubble.id === bubbleid)) {
			await axios.post(`${process.env.BASE_URL}/user/${userid}/addToBubble`, { id: `${bubbleid}` });
		}
	}
}

export { addUserToBubble };

async function updateUser(userid, user) {
	let userExist = await getUserById(userid);
	let currentDate = new Date().toISOString();
	user.lastCheck = currentDate;
	if (userExist.length) {
		try {
			await axios.patch(`${process.env.BASE_URL}/user/${userid}`, user);
		} catch (e) {
			console.log(e);
		}
	}
}

export { updateUser };

async function updateFollowers(userid, followerList) {
	let userExist = await getUserById(userid);
	try {
		await axios({
			method: 'patch',
			url: `${process.env.BASE_URL}/user/${userid}/followers`,
			data: [
				{
					id: '56022727',
				},
				{
					id: '55654644545854',
				},
			],
		});
	} catch (e) {
		console.log(e);
	}
}

export { updateFollowers };

async function removeUserFromBubble(userid, bubbleid) {
	let userExist = await getUserById(userid);
	if (userExist.length) {
		userExist = userExist[0];
		let getBubbles = userExist.bubble;
		if (getBubbles.find((bubble) => bubble.id === bubbleid)) {
			try {
				await axios.delete(`${process.env.BASE_URL}/user/${userid}/bubble`, { data: { id: bubbleid } });
			} catch (e) {
				console.log(e);
			}
		}
	}
}

export { removeUserFromBubble };
