import React, {useRef} from 'react'
import './register.css'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const userRef = useRef()
  const passRef = useRef() 
  const confirmRef = useRef()
  const navigate = useNavigate() 

  const submitRegister = async() => {
      try{
        const registerReq = await fetch('http://localhost:4000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                username: userRef.current.value,
                password: passRef.current.value,
                confirm: confirmRef.current.value
            })
        })
    
        if(registerReq.status === 200){
            const registerResponse = await registerReq.json()
            console.log('Response: ', registerResponse)
            // navigate('/app', {replace: true})
        }
        
      } catch(err){
          alert('check error log')
          console.log(err)
      }
  }  

  return (
    <section className="register-sec">
        <div className="register-box">
            <h3>Register</h3>
            <input ref={userRef} type="text" placeholder="Username" />
            <input ref={passRef} type="password" placeholder="Password" />
            <input ref={confirmRef} type="password" placeholder="Confirm Password" />
            <input type="submit" value="Login" onClick={submitRegister} />
        </div>
        <span><Link to="/Login">Login</Link></span>
    </section>
  )
}

export default Register