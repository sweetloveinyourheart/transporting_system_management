import axios from 'axios'


async function submitOrder(order) {
    try {
        const { data } = await axios.post("http://localhost:9999/api/v1/orders/submit", order);
        if (!data) throw new Error()

        return data
    } catch (error) {
        return null;
    }
}

export {
    submitOrder
}