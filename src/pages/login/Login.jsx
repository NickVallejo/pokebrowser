import React, {useRef} from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const userRef = useRef()
  const passRef = useRef() 
  const navigate = useNavigate() 

  const submitLogin = async() => {
    try{
      const loginReq = await fetch('http://localhost:4000/api/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json', 
              'Accept': 'application/json',
          },
          body: JSON.stringify({
              username: userRef.current.value,
              password: passRef.current.value,
          })
      })
      if(loginReq.status === 200){
          const loginResponse = await loginReq.json()
          if(loginResponse.success){navigate('/app', {replace: true})}
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

export default Login