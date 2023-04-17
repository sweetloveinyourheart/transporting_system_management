import axios from "axios"

async function searchTrip(provinceStart, provinceEnd, dateTime) {
    try {
        const { data, error } = await axios.post("http://localhost:9999/api/v1/trips/search?pageNo=0&&pageSize=10", { provinceStart, provinceEnd, dateTime })
        if (!data || error) throw new Error()

        console.log("check search", data);
        return data

        // const res = await fetch("http://localhost:9999/api/v1/trips/search?pageNo=0&&pageSize=10", {
        //     method: "POST",
        //     body: JSON.stringify({ sourceCity, destinationCity, searchDate }),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })

        // const data = await res.json()
        // console.log(data);
        // return data
    } catch (error) {
        console.log(error);
        return null
    }
}


export {
    searchTrip,
}