import axios from 'axios'

const PAGE_SIZE = 1 

async function getAllTrip(pageNumber) {
    try {
        const { data } = await axios.get(`http://localhost:9999/api/v1/trips/getAll?keyword&pageNo=${pageNumber}&pageSize=${PAGE_SIZE}`)
        if (!data) throw new Error()

        return data
    } catch (error) {
        return null
    }
}

async function createTrip(newTrip) {
    try {
        const { data } = await axios.post("http://localhost:9999/api/v1/trips", newTrip)
        if (!data) throw new Error()

        return data
    } catch (error) {
        return null
    }
}

async function getProvinces() {
    try {
        const { data } = await axios.get("http://localhost:9999/api/v1/provinces")
        if (!data) throw new Error()

        return data
    } catch (error) {
        return []
    }
}

async function editTrip(tripId, updateData) {
    try {
        const { data } = await axios.put(`http://localhost:9999/api/v1/trips/${tripId}`, updateData)

        if (!data) throw new Error()

        return data
    } catch (error) {
        return data
    }
}

async function deleteTrip(tripId) {
    try {
        const { data } = await axios.delete(`http://localhost:9999/api/v1/trips/${tripId}`)

        if (!data) throw new Error()

        return data
    } catch (error) {
        return data
    }
}

export {
    getAllTrip,
    createTrip,
    getProvinces,
    editTrip,
    deleteTrip
}