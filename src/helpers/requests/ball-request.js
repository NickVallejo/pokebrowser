const ballReq = async(add) => {
    try{
        const ballRequest = await fetch('http://localhost:4000/api/players/manage-balls', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify({add})
        })
        
        if(ballRequest.status === 200){
            return await ballRequest.json()
        }

    } catch(err){
        console.log('ERROR SENT HERE', err)
        alert(`Unhandled error: ${err.message}. Check console.`)
    }
}

export default ballReq