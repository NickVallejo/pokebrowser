const submitRegister = async(username, password, confirm) => {
    try{
        const registerReq = await fetch('http://localhost:4000/api/auth/register', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify({
                username,
                password,
                confirm,
            })
        })
    
        if(registerReq.status === 200){
            return await registerReq.json()
        }
        
      } catch(err){
          alert('check error log')
          console.log(err)
      }
}

export default submitRegister