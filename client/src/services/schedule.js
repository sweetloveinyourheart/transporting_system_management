import { BASE_URL } from "../constant/network"

export const getSchedule = async (accessToken) => {
    return await fetch(`${BASE_URL}/api/v1/Calendars`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        }
    }).then(res => res.json())
}