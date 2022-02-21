import React, { useEffect, useState, useRef } from 'react';
import EncounterPoke from './EncounterPoke';
import { useDispatch, useSelector } from 'react-redux';
import { inventoryActions, encounterActions, myPokemonActions } from '../../store';
import { encounterRollForCatch } from '../../store/action-creators/encounterEngage';
import pokeball from '../../assets/img/pokeball.png'
import { tryPokeAnim, shakeBallAnim, caughtPokeAnim, escapedPokemonAnim } from '../../store/action-creators/encounterAnimations';

function TryPoke({poke, healthReducer}) {
    const dispatch = useDispatch()
    const ball = useSelector(state => state.encounter.ball)
    const [catchText, setCatchText] = useState(false)
    const tryPokeBall = useRef()
    const tryPokePoke = useRef()

    useEffect(() => {
        const tryPokeCatch = async() => {
            dispatch(inventoryActions.removePokeball())
            const catchRoll = dispatch(encounterRollForCatch(poke, healthReducer, ball))


            await tryPokeAnim(tryPokeBall, tryPokePoke)
            setCatchText({caught: 'pending', text: "ball is shaking..."})
            await shakeBallAnim(tryPokeBall, catchRoll.shakes)

            if(!catchRoll.caught){
                setCatchText({caught: 'false', text: "Failed to catch!"})
                await escapedPokemonAnim(tryPokeBall, tryPokePoke)
                setTimeout(() => {dispatch(encounterActions.retryCatch())}, 1000)
            } else{
                setCatchText({caught: 'true', text: "You caught it!"})
                await caughtPokeAnim(tryPokeBall)
                setTimeout(() => {
                    dispatch(myPokemonActions.addPokemon({poke}))
                    dispatch(encounterActions.stopEncounter())
                }, 1000)
            }
        }   

        tryPokeCatch()
    }, [])  

    return (
        <div className="trypoke-menu">
            <div ref={tryPokePoke} className="trypoke-catchbox">
                <EncounterPoke poke={poke}/>
            </div>
            <img className="trypoke-ball" ref={tryPokeBall} src={pokeball} />
            {/* <h1 className="trypoke-title">Attempting to catch {poke.name} with reducer of {healthReducer}</h1> */}
            {catchText && <p className={`trypoke-catch status-${catchText.caught}`}>{catchText.text}</p>}
        </div>   
    )
}

export default TryPoke;
