import { BASE_URL } from "../constant/network"

export const getOderByUser = async (accessToken) => {
    return await fetch(`${BASE_URL}/api/v1/orderdetails/user`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        }
    }).then(res => res.json())
}