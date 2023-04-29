import axios from 'axios'
import { BASE_URL } from 'constant/network'

const PAGE_SIZE = 10

async function getAllCar(pageNumber) {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/cars?keyword&pageNo=${pageNumber}&pageSize=${PAGE_SIZE}` )
        if (!data) throw new Error()

        return data
    } catch (error) {
        return null
    }
}

async function createCar(newCar) {
    try {
        const { data } = await axios.post(`${BASE_URL}/api/v1/cars`, newCar)
        if (!data) throw new Error()

        return data
    } catch (error) {
        return null
    }
}

async function addTripForCar(info) {
    try {
        const { data } = await axios.post(`${BASE_URL}/api/v1/cars/addTripForCar`, info)
        if (!data) throw new Error()

        return data
    } catch (error) {
        return null
    }
}

async function addDriverForCar(info) {
    try {
        const { data } = await axios.post(`${BASE_URL}/api/v1/cars/addDriverForCar`, info)
        if (!data) throw new Error()

        return data
    } catch (error) {
        return null
    }
}


async function editCar(carId, updateData) {
    try {
        const { data } = await axios.put(`${BASE_URL}/api/v1/cars/${carId}`, updateData)

        if (!data) throw new Error()

        return data
    } catch (error) {
        return data
    }
}

async function deleteCar(carId) {
    try {
        const { data } = await axios.delete(`${BASE_URL}/api/v1/cars/${carId}`)

        if (!data) throw new Error()

        return data
    } catch (error) {
        return data
    }
}

export {
    getAllCar,
    createCar,
    editCar,
    deleteCar,
    addDriverForCar,
    addTripForCar
}