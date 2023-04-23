import axios from "axios"
import { BASE_URL } from "../constant/network";

async function searchTrip(provinceStart, provinceEnd, dateTime) {
    try {
        const { data, error } = await axios.post(`${BASE_URL}/api/v1/trips/search?pageNo=0&&pageSize=10`, { provinceStart, provinceEnd, dateTime })
        if (!data || error) throw new Error()

        return data

    } catch (error) {
        console.log(error);
        return null
    }
}


export {
    searchTrip,
}