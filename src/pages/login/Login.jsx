import React, {useRef, useEffect, useState} from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import authReq from '../../helpers/requests/auth-request'

function Login() {
  const userRef = useRef()
  const passRef = useRef() 
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(undefined)

  useEffect(() => setLoading(false), [user])
  useEffect(async() => {
    setLoading(true)
    setUser(await authReq())
  }, [])

  const submitLogin = async() => {
    try{
      const loginReq = await fetch('http://localhost:4000/api/auth/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json', 
              'Accept': 'application/json',
              'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({
              username: userRef.current.value,
              password: passRef.current.value,
          })
      })

      if(loginReq.status === 200){
          const loginResponse = await loginReq.json()
          if(loginResponse.success){
            console.log('login success')
            navigate('/app', {replace: true})
          }
          else{
            alert('Incorrect Login') 
            console.log(loginResponse.data)
        }
      }
    } catch(err){
        alert('check error log')
        console.log(err)
    }
  }
  
  if(loading && user === undefined) return <div>Loading...</div>
  if(!loading && user){navigate('/app', {replace: true})}

  if(!loading && !user){
    return (
      <section className="login-sec">
          <div className="login-box">
              <h3>Login</h3>
              <input ref={userRef} type="text" placeholder="Username" />
              <input ref={passRef} type="password" placeholder="Password" />
              <input type="submit" value="Login" onClick={submitLogin} />
              <span><Link to="/Register">Register</Link></span>
          </div>
      </section>
    )
  }

  else{
    return null
  }
}

export default Login