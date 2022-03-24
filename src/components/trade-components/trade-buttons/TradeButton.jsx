import React from 'react'

function TradeButton({text, method, btnRequest, className}) {

    const requestHandler = () => btnRequest(method)

    return (
        <button className={className} onClick={requestHandler}>{text}</button>
    )
}

export default TradeButton