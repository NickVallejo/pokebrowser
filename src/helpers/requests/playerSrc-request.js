const playerSrcReq = async(src) => {
    try{
        const playerSrcRequest = await fetch(`http://localhost:4000/api/players?src=${src}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
            },
        })

        if(playerSrcRequest.status === 200){
            return await playerSrcRequest.json()
        }

    } catch(err){
        alert('Internal server error. Check console.')
        console.log(err)
    }
}


export default playerSrcReq