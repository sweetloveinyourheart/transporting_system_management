export const getLeave = async (id, accessToken) => {
    return await fetch(`http://localhost:9999/api/v1/leaves/${id}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        }
    }).then(res => res.json())
}

export const addLeave = async (dateStart, dateEnd, reason, accessToken) => {
    return fetch('http://localhost:9999/api/v1/leaves', {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            dateStart,
            dateEnd,
            reason
        })
    }).then(res => res.json())
}