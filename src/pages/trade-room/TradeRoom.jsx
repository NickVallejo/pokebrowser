import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import roomReq from '../../helpers/requests/room-request';
import TradeRoomActive from './TradeRoomActive';
import Loading from '../../components/load-components/Loading';
import NotFound from '../../components/load-components/NotFound';
import { Provider } from 'react-redux';
import traderStore from '../../store-traderooms';
import './trade-room.css'

function TradeRoom() {
    const params = useParams();
    const navigate = useNavigate()
    const [auth, setAuth] = useState(undefined)
    const [enteredUser, setEnteredUser] = useState()
    const [host, setHost] = useState()
    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        const roomRequest = async() => {
            try{
                const _id = searchParams.get('_id')
                const roomRes = await roomReq(params.id, _id)
                if(roomRes.success) {
                    setEnteredUser(roomRes.data.user)
                    setHost(roomRes.data.host)
                    setAuth(true)
                }
                else setAuth(false)
                
            } catch(err){
                navigate('/login', {replace: true})
            }
        }

        roomRequest()
    }, [])

    if(auth === true){
        return (
            <Provider store={traderStore}>
                <TradeRoomActive roomId={params.id} enteredUser={enteredUser} host={host}/>
            </Provider>
          )
    } else if (auth === false){
        return <NotFound text={'This room does not exist. At least not for you...'} />
    } else{
        return <Loading />
    }
}

export default TradeRoom