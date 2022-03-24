const submitLogin = async(username, password) => {
    try{
      const loginReq = await fetch('http://localhost:4000/api/auth/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json', 
              'Accept': 'application/json',
              'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({username, password})
      })

      if(loginReq.status === 200){
          return await loginReq.json()
      }

    } catch(err){
        alert('check error log')
        console.log(err)
    }
  }

  export default submitLogin