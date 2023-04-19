import axios from "axios"

async function getUser() {
    try {
        const { data, error } = await axios.get("http://localhost:9999/api/v1/accounts/information")
        if (!data || error) throw new Error()

        return data
    } catch (error) {
        return null
    }
}

async function changePasswordAPI(passwordOld, passwordNew) {
    try {
        const { data, error } = await axios.post("http://localhost:9999/api/v1/accounts/changepassword", {
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
        const { data, error } = await axios.put(`http://localhost:9999/api/v1/users/${userId}`, {
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