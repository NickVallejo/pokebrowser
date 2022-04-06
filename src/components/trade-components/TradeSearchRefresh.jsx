import React, {useRef} from 'react'

function TradeSearchRefresh({submitSearchHandler}) {

    const spinRef = useRef()

    const submitSearchRefresh = (e) => {
        spinRef.current.style.transform = 
        spinRef.current.style.transform === "rotate(360deg)" ? "rotate(0deg)" : "rotate(360deg)"
        submitSearchHandler(e, true)
    }

  return (
    <span className="trade-refresh" onClick={submitSearchRefresh}>Refresh <i ref={spinRef} className="fa-solid fa-rotate"></i></span>
  )
}

export default TradeSearchRefresh