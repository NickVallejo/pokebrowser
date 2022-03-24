import React, {useEffect, useState} from 'react'

function Toast({text, good}) {
    const [toastState, setToastState] = useState('inactive-toast')
    const [toastLvl, setToastLvl] = useState()

    useEffect(() => {
        text ? setToastState('active-toast') : setToastState('inactive-toast')
        good ? setToastLvl('prim') : setToastLvl('ter')
    }, [text])

  return (
    <div className={`toast pkb-btn ${toastState} ${toastLvl}`}>
        <h5 className="toast-txt">{text}</h5>
    </div>
  )
}

export default Toast