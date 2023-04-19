
export const getSchedule = async (accessToken) => {
    return await fetch('http://localhost:9999/api/v1/Calendars', {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        }
    }).then(res => res.json())
}