import React, {useState, useEffect} from 'react'
import './css/App.css'
import Field from './components/board-components/Field'
import PlayerMenu from './components/playermenu-components/PlayerMenu';
import TradeMenu from './components/trade-components/TradeMenu';
import Loading from './components/load-components/Loading';
import {useSelector, useDispatch} from 'react-redux'
import authReq from './helpers/requests/auth-request';
import { useNavigate } from 'react-router-dom';
import { fieldMusicToggle } from './helpers/musicDJ';
import { bootAppDependencies } from './store/action-creators/thunks-ui';
import Header from './components/board-components/Header';
import { checkTutorial } from './helpers/tutorialCheck';
import Tutorial from './components/board-components/Tutorial';

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [showTutorial, setShowTutorial] = useState(false)
  const user = useSelector(state => state.usermeta.user)

  useEffect(async() => {
    const appInit = async() => {
        const authRes = await authReq()
        if(authRes){
          setShowTutorial(checkTutorial())
          setLoading(dispatch(bootAppDependencies(authRes)))
        } else{
          document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          navigate('/login', {replace: true})
        }
    }
    appInit()
    return () => fieldMusicToggle(false)
  }, [])

  if(!loading && user === false) navigate('/login')
  if(!loading && user){
    return (
      <section className="app-sec">
        {showTutorial && <Tutorial />}
        <Header />
        <div className="app-wrap">
        <PlayerMenu />
        <Field />
        <TradeMenu />
        </div>
      </section>
    );
  }

  else return <Loading />
}

export default App;
