const authReq = async() => {
    try{
        const authRequest = await fetch('http://localhost:4000/api/auth/access', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Access-Control-Allow-Credentials': 'true',
            },
        })
        
        if(authRequest.status === 200){
            const authRes = await authRequest.json()
            return authRes.success ? authRes.data.user : false
        }

    } catch(err){
        alert(`Unhandled error: ${err.message}. Check console.`)
        console.log(err)
    }
}

export default authReq