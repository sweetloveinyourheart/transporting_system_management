import axios from 'axios'
import { BASE_URL } from 'constant/network'

const PAGE_SIZE = 10

async function getOrders(pageNumber) {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/orderdetails?keyword&pageNo=${pageNumber}&pageSize=${PAGE_SIZE}` )
        if (!data) throw new Error()

        return data
    } catch (error) {
        return []
    }
}

export {
    getOrders
}