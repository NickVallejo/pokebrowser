const httpReq = async(url, method = 'GET', headers, body) => {
    try{
        const request = await fetch(url, {
            method: method,
            headers: headers,
            credentials: 'include',
            body: JSON.stringify(body)
        }) 

        if(request.status === 200) return await request.json()
        else throw new Error('Unforseen Error with httpReq Func.')
        
    } catch(err){
        alert('Internal server error. Check console.')
        console.log(err)
    }
}

export default httpReq