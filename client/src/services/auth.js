import axios from 'axios'

async function login(username, password) {
	try {
		const { data, error } = await axios.post("http://localhost:9999/api/v1/auth/signin", { username, password })

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
		const { data } = await axios.post("http://localhost:9999/api/v1/auth/signupuser", {
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

// async function refreshToken(token) {
//     try {
//         const { data, error } = await axios.get("http://localhost:9000/authentication/refresh-token?token=" + token)

//         if (!data || error) throw new Error()

//         return {
//             access_token: data.access_token
//         }
//     } catch (error) {
//         return {
//             access_token: null
//         }
//     }
// }


export {
	login, register
	// refreshToken,
}