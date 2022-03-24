import React, {useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { logregIntroAnim } from '../animations/logreg-anim'
import { titleMusicToggle, fieldMusicToggle } from '../../../helpers/musicDJ'

function RegisterBox({submitRegister}) {
  const userRef = useRef()
  const passRef = useRef() 
  const confirmRef = useRef()
  const boxRef = useRef()

  const submitRegisterHandler = () => {
    submitRegister(userRef.current.value, passRef.current.value, confirmRef.current.value)
  }

  useEffect(() => {
    fieldMusicToggle(false)
    titleMusicToggle(true)
    logregIntroAnim(boxRef)
  }, [])

  return (
    <div ref={boxRef} className="logreg-box reg-box">
        <div className="logreg-title__box">
            <h1>Register</h1>
        </div>
        <input className="logreg-input" ref={userRef} type="text" placeholder="Username" />
        <input className="logreg-input" ref={passRef} type="password" placeholder="Password" />
        <input className="logreg-input" ref={confirmRef} type="password" placeholder="Confirm Password" />
        <div className="logreg-btns">
            <button className="logreg-btn"><Link to="/login">Login</Link></button>
            <button className="logreg-btn" onClick={submitRegisterHandler}>Register</button>
        </div>
    </div>
  )
}

export default RegisterBox