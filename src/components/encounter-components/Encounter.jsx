import React,  {useEffect, useRef,} from 'react';
import { useSelector } from 'react-redux';
import EncounterMenu from './EncounterMenu';
import EngageInit from './EngageInit';
import TryPoke from './TryPoke';
import { encounterStartAnim } from '../../store/action-creators/animations-encounters';

function Encounter() {
    const poke = useSelector(state => state.encounter.encPoke)
    const engaged = useSelector(state => state.encounter.engPoke)
    const trying = useSelector(state => state.encounter.tryPoke)
    const healthReducer = useSelector(state => state.encounter.healthReducer)
    const retry = useSelector(state => state.encounter.retry)
    const playerInv = useSelector(state => state.inventory)
    const screen = useRef()

    useEffect(() => {
        setTimeout(() => {
            encounterStartAnim(screen)
        }, 1000)
    }, [])

    return <div ref={screen} className="enc-screen">
        <div className="enc-screen__wrap">
            {(!engaged && trying) && <TryPoke poke={poke} healthReducer={healthReducer}/>}
            {(!engaged && !trying) && <EncounterMenu retry={retry} poke={poke} playerInv={playerInv}/>}
            {(engaged && !trying) && <EngageInit poke={poke}/>}
        </div>
    </div>;
}

export default Encounter;
