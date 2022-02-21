import React, {useRef, useEffect, useState, useCallback} from 'react';
import { encounterActions } from '../../../store';
import { encounterSliderPlay } from '../../../store/action-creators/encounterEngage';
import { useDispatch } from 'react-redux';
import encounterAnims from '../../../store/action-creators/encounterAnimations'
import tapAudio from '../../../helpers/audio-tap'

function SliderBar({captureRate, fieldQuicktime, taps, healthReducer, slider, target, pounder}) {
    const dispatch = useDispatch()
    const [intervalSwingId, setIntervalSwingId] = useState()
    const [firstRender, setFirstRender] = useState(true)
    const [audioTaps, setAudioTaps] = useState({
        tap1: new Audio(tapAudio['tap1']),
        tap2: new Audio(tapAudio['tap2']),
        tap3: new Audio(tapAudio['tap3'])
    })

    const passUpTap = useCallback((e) => {fieldQuicktime(e)}, [])

    useEffect(() => {
        !firstRender && audioTaps[`tap${taps}`].play()
        firstRender && setFirstRender(false)

        if(taps === 3){
          clearInterval(intervalSwingId)
          document.removeEventListener('keydown', passUpTap)
          setTimeout(() => {
            dispatch(encounterActions.attemptCatch({healthReducer: healthReducer}))
          }, 2000)
        }
      }, [taps])
    
      useEffect(() => {
          setIntervalSwingId(dispatch(encounterSliderPlay(pounder, slider, captureRate)))
          document.addEventListener('keydown', passUpTap)
      }, [])

    return (
    <div ref={slider} className="enc-slider" style={{maxWidth: '1150px'}}>
        <div ref={target} className="enc-target"></div>
        <div ref={pounder} style={{width: '120px', height: '120px'}} className="enc-pounder">
            {/* <div className="enc-pounder-ring"></div> */}
        </div>
    </div>
    )
}

export default SliderBar;
