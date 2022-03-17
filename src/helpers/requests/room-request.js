const roomReq = async(id, _id) => {
    try{
        const roomRequest = await fetch(`http://localhost:4000/api/trades/room/${id}?_id=${_id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Access-Control-Allow-Credentials': 'true',
            },
        })
        
        if(roomRequest.status === 200){
            return await roomRequest.json()
        }

    } catch(err){
        alert(`Unhandled error: ${err.message}. Check console.`)
        console.log(err)
    }
}

export default roomReq