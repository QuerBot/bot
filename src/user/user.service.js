// User Service for NestJS Api - All Routes
const axios = require('axios').default;

export async function postUser(user) {
	await axios.post(`${process.env.BASE_URL}/user`, user);
}
