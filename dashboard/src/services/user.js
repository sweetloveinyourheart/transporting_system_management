import axios from 'axios'
import { BASE_URL } from 'constant/network'

const PAGE_SIZE = 10

async function getUsers(pageNumber) {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/users?keyword&pageNumber=${pageNumber}&pageSize=${PAGE_SIZE}`)

        if (!data) throw new Error()

        return data
    } catch (error) {
        return data
    }
}

async function editUserProfile(userId, updateData) {
    try {
        const { data } = await axios.put(`${BASE_URL}/api/v1/users/${userId}`, updateData)

        if (!data) throw new Error()

        return data
    } catch (error) {
        return data
    }
}

async function editEmployeeProfile(userId, updateData) {
    try {
        const { data } = await axios.put(`${BASE_URL}/api/v1/employees/${userId}`, updateData)

        if (!data) throw new Error()

        return data
    } catch (error) {
        return data
    }
}

async function getEmployees(pageNumber) {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/employees/getemployee?pageNumber=${pageNumber}&pageSize=${PAGE_SIZE}`)

        if (!data) throw new Error()

        return data
    } catch (error) {
        return data
    }
}

async function getDrivers(pageNumber) {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/employees/getdriver?pageNumber=${pageNumber}&pageSize=${PAGE_SIZE}`)

        if (!data) throw new Error()

        return data
    } catch (error) {
        return data
    }
}

async function changeUserRole(accountId, updateData) {
    try {
        const { data } = await axios.put(`${BASE_URL}/api/v1/accounts/${accountId}`, updateData)

        if (!data) throw new Error()

        return data
    } catch (error) {
        return data
    }
}

export {
    getUsers,
    getEmployees,
    getDrivers,
    editUserProfile,
    changeUserRole,
    editEmployeeProfile
}