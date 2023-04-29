import axios from "axios"
import { BASE_URL } from "../constant/network"

async function getUser() {
    try {
        const { data, error } = await axios.get(`${BASE_URL}/api/v1/accounts/information`)
        if (!data || error) throw new Error()

        return data
    } catch (error) {
        return null
    }
}

async function changePasswordAPI(passwordOld, passwordNew) {
    try {
        const { data, error } = await axios.post(`${BASE_URL}/api/v1/accounts/changepassword`, {
            passwordOld: passwordOld, passwordNew: passwordNew
        })
        if (!data || error) throw new Error()

        return data
    } catch (error) {
        return null
    }
}
async function editProfile(userId, fullName, phoneNumber, email, address) {
    try {
        console.log("check editprofile", fullName, phoneNumber, email, address);
        const { data, error } = await axios.put(`${BASE_URL}/api/v1/users/${userId}`, {
            fullName: fullName,
            phoneNumber: phoneNumber,
            email: email,
            address: address
        })
        if (!data || error) throw new Error()
        console.log("Check data", data);
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
export {
    getUser,
    changePasswordAPI,
    editProfile
}