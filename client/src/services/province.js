import axios from "axios";
import { BASE_URL } from "../constant/network";

async function getProvince() {
    try {
        const { data, error } = await axios.get(`${BASE_URL}/api/v1/provinces`);
        if (!data || error) throw new Error()
        return data
    } catch (error) {
        return null;
    }
}
export {
    getProvince,
}