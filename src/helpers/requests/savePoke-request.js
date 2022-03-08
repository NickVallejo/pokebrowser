const savePokeReq = async(poke) => {
    try{
        const savePokeRequest = await fetch('http://localhost:4000/api/players/add-poke', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify({poke})
        })

        if(savePokeRequest.status === 200){
            return await savePokeRequest.json()
        }

    } catch(err){
        alert('Internal server error. Check console.')
        console.log(err)
    }
}

export default savePokeReq