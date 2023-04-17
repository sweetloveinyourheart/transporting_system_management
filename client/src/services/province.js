import axios from "axios";

async function getProvince() {
    try {
        const { data, error } = await axios.get("http://localhost:9999/api/v1/provinces");
        if (!data || error) throw new Error()
        return data
    } catch (error) {
        return null;
    }
}
export {
    getProvince,
}