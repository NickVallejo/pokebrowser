import React, {useRef, useState, useEffect} from 'react'
import '../login/login.css'
import { useNavigate, Link } from 'react-router-dom'
import authReq from '../../helpers/requests/auth-request'
import submitRegister from '../../helpers/requests/register-request'
import Loading from '../../components/load-components/Loading'
import Toast from '../../components/board-components/Toast'
import Logo from './components/Logo'
import RegisterBox from './components/RegisterBox'

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

  const submitRegisterInit = async(user, pass, confirm) => {
    console.log('PING')
      if(user && pass && confirm){
          const registerResponse = await submitRegister(user, pass, confirm)
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