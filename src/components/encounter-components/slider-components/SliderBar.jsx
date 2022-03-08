import React, {useEffect, useState, useCallback} from 'react';
import { encounterSliderPlay, encounterSliderStop } from '../../../store/action-creators/thunks-encounters';
import { useDispatch } from 'react-redux';
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
        firstRender ? setFirstRender(false) : audioTaps[`tap${taps}`].play()
        taps === 3 && dispatch(encounterSliderStop(intervalSwingId, passUpTap, healthReducer))
      }, [taps])
    
      useEffect(() => {
          setIntervalSwingId(dispatch(encounterSliderPlay(pounder, slider, captureRate, passUpTap)))
      }, [])

    return (
    <div ref={slider} className="enc-slider" style={{maxWidth: '1150px'}}>
        <div ref={target} className="enc-target"></div>
        <div ref={pounder} style={{width: '120px', height: '120px'}} className="enc-pounder"></div>
    </div>
    )
}

export default SliderBar;
