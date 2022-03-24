import React, {useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { logregIntroAnim } from '../animations/logreg-anim'
import { titleMusicToggle, fieldMusicToggle } from '../../../helpers/musicDJ'

function LoginBox({submitLogin}) {
  const userRef = useRef()
  const passRef = useRef()
  const boxRef = useRef() 

  const submitLoginHandler = () => submitLogin(userRef.current.value, passRef.current.value)
  useEffect(() => {
    fieldMusicToggle(false)
    titleMusicToggle(true)
    logregIntroAnim(boxRef)
  }, [])

  return (
    <div ref={boxRef} className="logreg-box login-box">
    <div className="logreg-title__box">
      <h1>Login</h1>
    </div>
      <input className="logreg-input" ref={userRef} type="text" placeholder="Username" />
      <input className="logreg-input" ref={passRef} type="password" placeholder="Password" />
      
      <div className="logreg-btns">
        <button className="logreg-btn"><Link to="/register">Register</Link></button>
        <button className="logreg-btn" onClick={submitLoginHandler}>Login</button>
      </div>
  </div>
  )
}

export default LoginBox