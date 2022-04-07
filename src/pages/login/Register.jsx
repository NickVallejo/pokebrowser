import React, {useRef, useState, useEffect} from 'react'
import '../login/login.css'
import { useNavigate, Link } from 'react-router-dom'
import authReq from '../../helpers/requests/auth-request'
import submitRegister from '../../helpers/requests/register-request'
import Toast from '../../components/board-components/Toast'
import Logo from './components/Logo'
import RegisterBox from './components/RegisterBox'
import httpReq from '../../helpers/requests/use-http'

function Register() {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(undefined)
  const [popToast, setPopToast] = useState(false)

  useEffect(() => setTimeout(() => setPopToast(false), 5000), [popToast])
  useEffect(() => {
    setLoading(false)
  }, [user])
  useEffect(async() => {
    setLoading(true)
    setUser(await authReq())
  }, [])

  const submitRegisterInit = async(username, password, confirm) => {
    console.log('PING')
      if(username && password && confirm){
          // const registerResponse = await submitRegister(user, pass, confirm)
          const registerResponse = await httpReq('http://localhost:4000/api/auth/register', 'POST', {
            'Content-Type': 'application/json', 
            'Accept': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
          }, {username, password, confirm})
          
          if(registerResponse.success) {
            sessionStorage.setItem('new', true)
            navigate('/app', {replace: true})
          }
          else setPopToast({msg: registerResponse.data, good: false})
    } 
    else setPopToast({msg: 'Please Fill all fields.', good: false})
  }

  if(loading && user === undefined) return null
  if(!loading && user){navigate('/app', {replace: true})}

  if(!loading && !user){
    return (
        <section className="logreg-sec reg-sec">
            <Logo />
            <RegisterBox submitRegister={submitRegisterInit} />
            <Toast text={popToast.msg} good={popToast.good} />
        </section>
    )
  }

  else return null
}

export default Register