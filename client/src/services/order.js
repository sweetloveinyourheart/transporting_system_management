import axios from 'axios'
import { BASE_URL } from '../constant/network';


async function submitOrder(order) {
    try {
        const { data } = await axios.post(`${BASE_URL}/api/v1/orders/submit`, order);
        if (!data) throw new Error()

        return data
    } catch (error) {
        return null;
    }
}

export {
    submitOrder
}