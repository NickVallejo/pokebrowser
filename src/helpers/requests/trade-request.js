const tradeReq = async(method, body, active_trade, _id) => {

    switch(method){
        case 'DELETE':
            body = {tradeId: active_trade.tradeId}
            break
        case 'POST':
            body = {userId: _id}
            break
        case 'PUT':
            body = {tradeId: active_trade.tradeId}
            break
    }

    try{
        const tradeRequest = await fetch('http://localhost:4000/api/trades', {
            method,
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

export default tradeReq