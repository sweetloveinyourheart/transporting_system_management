export const getOderByUser = async (accessToken) => {
    return await fetch('http://localhost:9999/api/v1/orderdetails/user', {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        }
    }).then(res => res.json())
}