import axios from 'axios'

async function revenueByYear(year) {
    try {
        const { data } = await axios.post("http://localhost:9999/api/v1/dashboards/revenue-year", { year })
        if (!data) throw new Error()

        return data
    } catch (error) {
        return null
    }
}

async function revenueByMonth(year, month) {
    try {
        const { data } = await axios.post("http://localhost:9999/api/v1/dashboards", { year, month })
        if (!data) throw new Error()

        return data
    } catch (error) {
        return null
    }
}

export {
    revenueByYear,
    revenueByMonth
}