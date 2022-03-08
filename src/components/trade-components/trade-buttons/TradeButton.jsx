import React from 'react'

function TradeButton({text, method, btnRequest}) {

    const requestHandler = () => btnRequest(method)

    return (
        <button className="trade-req__btn" onClick={requestHandler}>{text}</button>
    )
}

export default TradeButton