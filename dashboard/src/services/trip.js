import axios from 'axios'
import { BASE_URL } from 'constant/network'

const PAGE_SIZE = 10

async function getAllTrip(pageNumber) {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/trips/getAll?keyword&pageNo=${pageNumber}&pageSize=${PAGE_SIZE}`)
        if (!data) throw new Error()

        return data
    } catch (error) {
        return null
    }
}

async function createTrip(newTrip) {
    try {
        const { data } = await axios.post(`${BASE_URL}/api/v1/trips`, newTrip)
        if (!data) throw new Error()

        return data
    } catch (error) {
        return null
    }
}

async function getProvinces() {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/provinces`)
        if (!data) throw new Error()

        return data
    } catch (error) {
        return []
    }
}

async function editTrip(tripId, updateData) {
    try {
        const { data } = await axios.put(`${BASE_URL}/api/v1/trips/${tripId}`, updateData)

        if (!data) throw new Error()

        return data
    } catch (error) {
        return data
    }
}

async function deleteTrip(tripId) {
    try {
        const { data } = await axios.delete(`${BASE_URL}/api/v1/trips/${tripId}`)

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