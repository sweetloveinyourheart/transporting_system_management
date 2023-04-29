import axios from 'axios'
import { BASE_URL } from '../constant/network'

async function login(username, password) {
	try {
		const { data, error } = await axios.post(`${BASE_URL}/api/v1/auth/signin`, { username, password })

		if (!data || error) throw new Error()

		return {
			access_token: data.accessToken,
			refresh_token: data.refreshToken
		}
	} catch (error) {
		return {
			access_token: null
		}
	}
}
async function register(username, password, fullname, phoneNumber, email, address) {
	try {
		const { data } = await axios.post(`${BASE_URL}/api/v1/auth/signupuser`, {
			username: username, password: password,
			user: {
				fullName: fullname,
				phoneNumber: phoneNumber,
				email: email,
				address: address
			}
		})
		if (!data) throw new Error()

		return data;
	} catch (error) {
		return null;
	}
}

export {
	login, 
	register
}