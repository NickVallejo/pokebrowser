import React from 'react'

function TradeButton({text, method, btnRequest}) {

    const requestHandler = () => btnRequest(method)

    return (
        <button className="cancel-trade__btn" onClick={requestHandler}>{text}</button>
    )
}

export default TradeButton