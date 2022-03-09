import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import roomReq from '../../helpers/requests/room-request';

function TradeRoom() {
    const params = useParams();
    const navigate = useNavigate()
    const [auth, setAuth] = useState(undefined)
    
    useEffect(async() => {
        try{
            const roomRes = await roomReq(params.id)
            console.log(roomRes)
            if(roomRes.success) setAuth(true)
            else setAuth(false)
        } catch(err){
            console.log(err)
            //navigate('/login', {replace: true})
        }
    }, [])

    if(auth === true){
        return (
            <div>you have reached roomId</div>
          )
    } else if (auth === false){
        return (
            <div>This trade ID does not exist. At least not for you...</div>
          )
    } else{
        return <div>Loading...</div>
    }
}

export default TradeRoom