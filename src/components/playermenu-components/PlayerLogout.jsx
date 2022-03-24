import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function PlayerLogout() {
    const navigate = useNavigate() 

    const logoutHandler = async() => {
        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        navigate('/login', {replace: true})
    }

  return (
    <button className="pkb-btn prim" onClick={logoutHandler}>Log Out</button>
  )
}

export default PlayerLogout