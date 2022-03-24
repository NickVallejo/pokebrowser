import React, {useRef, useEffect, useState} from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import authReq from '../../helpers/requests/auth-request'
import Loading from '../../components/load-components/Loading'
import submitLogin from '../../helpers/requests/login-request'
import Toast from '../../components/board-components/Toast'
import Logo from './components/Logo'
import LoginBox from './components/LoginBox'

function Login() { 
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(undefined)
  const [popToast, setPopToast] = useState(false)

  useEffect(() => setTimeout(() => setPopToast(false), 5000), [popToast])
  useEffect(() => setLoading(false), [user])
  useEffect(() => {
    const logRequest = async() => {
      setLoading(true)
      setUser(await authReq())
    }
    logRequest()
  }, [])

  const submitLoginInit = async(user, pass) => {
      if(user && pass){
        const loginResponse = await submitLogin(user, pass)
        if(loginResponse.success) navigate('/app', {replace: true})
        else setPopToast({msg: loginResponse.data, good: false})
      } else setPopToast({msg: 'Please Fill all fields.', good: false})
  }
  
  if(loading && user === undefined) return null
  if(!loading && user){navigate('/app', {replace: true})}

  if(!loading && !user){
    return (
      <section className="logreg-sec login-sec">
          <Logo />
          <LoginBox submitLogin={submitLoginInit} />
          <Toast text={popToast.msg} good={popToast.good} />
      </section>
    )
  }

  else return null
  
}

export default Login