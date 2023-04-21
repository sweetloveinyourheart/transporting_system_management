import axios from 'axios'

const PAGE_SIZE = 10

async function getOrders(pageNumber) {
    try {
        const { data } = await axios.get(`http://localhost:9999/api/v1/orderdetails?keyword&pageNo=${pageNumber}&pageSize=${PAGE_SIZE}` )
        if (!data) throw new Error()

        return data
    } catch (error) {
        return []
    }
}

export {
    getOrders
}