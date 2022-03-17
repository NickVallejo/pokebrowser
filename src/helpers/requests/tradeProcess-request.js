const processTradeReq = async(body) => {

    try{
        const tradeRequest = await fetch('http://localhost:4000/api/trades/process', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(body)
        })
    
        if(tradeRequest.status === 200){
            return await tradeRequest.json()
        } 

    } catch(err){
        alert('Internal server error. Check console.')
        console.log(err)
    }
}

export default processTradeReq