import React, { useEffect } from 'react'
import pokeball from '../../assets/img/pokeball.png'
import greatball from '../../assets/img/greatball.png'
import ultraball from '../../assets/img/ultraball.png'
import { encounterActions } from '../../store'
import { useDispatch } from 'react-redux'
import { encounterChooseBallAndEngage } from '../../store/action-creators/thunks-encounters'

function BallMenu({playerInv}) {
    const dispatch = useDispatch()

    useEffect(() => {
        document.addEventListener('keydown', chooseBallThenEngageHandler)
        return () => {
            document.removeEventListener('keydown', chooseBallThenEngageHandler)
        }
    }, [])

    const chooseBallThenEngageHandler = (e) => {
        dispatch(encounterChooseBallAndEngage(e.key, playerInv))
    }
    
    return (
    <div className="ball-menu">
        <div className="ball">
            <h3>1</h3>
            <img src={pokeball} alt="" />
            <span>{playerInv.balls.pkballs}x</span>
        </div>
        <div className="ball">
            <h3>2</h3>
            <img src={greatball} alt="" />
            <span>0x</span>
        </div>
        <div className="ball">
            <h3>3</h3>
            <img src={ultraball} alt="" />
            <span>0x</span>
        </div>
    </div>
    )
}

export default BallMenu