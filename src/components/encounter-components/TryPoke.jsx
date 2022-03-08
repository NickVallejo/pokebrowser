import React, { useEffect, useRef } from 'react';
import EncounterPoke from './EncounterPoke';
import { useDispatch, useSelector } from 'react-redux';
import { encounterCatchOrFail } from '../../store/action-creators/thunks-encounters';
import pokeball from '../../assets/img/pokeball.png'


function TryPoke({poke, healthReducer}) {
    const dispatch = useDispatch()
    const ball = useSelector(state => state.encounter.ball)
    const catchText = useSelector(state => state.encounter.catchText)
    const tryPokeBall = useRef()
    const tryPokePoke = useRef()

    useEffect(() => {
        dispatch(encounterCatchOrFail(poke, tryPokeBall, tryPokePoke, healthReducer, ball))
    }, [])  

    return (
        <div className="trypoke-menu">
            <div ref={tryPokePoke} className="trypoke-catchbox">
                <EncounterPoke poke={poke}/>
            </div>
            <img className="trypoke-ball" ref={tryPokeBall} src={pokeball} />
            {catchText && <p className={`trypoke-catch status-${catchText.caught}`}>{catchText.text}</p>}
        </div>   
    )
}

export default TryPoke;
