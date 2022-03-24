import { tryPokeAnim, shakeBallAnim, caughtPokeAnim, escapedPokemonAnim } from "./animations-encounters"
import { inventoryActions, encounterActions, myPokemonActions } from ".."
import savePokeReq from "../../helpers/requests/savePoke-request"
import { encounterMusicToggle, fieldMusicToggle } from "../../helpers/musicDJ"
import audioEncounter from "../../helpers/audio-encounter"

const runAudio = new Audio(audioEncounter['run'])
const alert = new Audio(audioEncounter['alert'])
const pickup = new Audio(audioEncounter['pickup'])

export const stopEncounterInit = (run=false) => {
    run && runAudio.play()
    return async(dispatch) => {
        encounterMusicToggle(false)
        dispatch(encounterActions.stopEncounter())
    }
}

export const startEncounterInit = (pkmn) => {
    return async(dispatch) => {
        fieldMusicToggle(false)
        alert.play()
        setTimeout(() => encounterMusicToggle(true), 1000)
        dispatch(encounterActions.startEncounter({pkmn}))
    }
}


export const encounterChooseBallAndEngage = (key, playerInv) => {
    return (dispatch) => {
        if(key == 1 || key == 2 || key == 3) pickup.play()

        switch(key){
            case '1':
              if(playerInv.balls.pkballs > 0){
                dispatch(encounterActions.engageEncounter({selectBall: 'pkball'}))
              }
              break;
            case '2':
              if(playerInv.balls.grballs > 0){
                dispatch(encounterActions.engageEncounter({selectBall: 'grball'}))
              }
              break;
            case '3':
              if(playerInv.balls.ultballs > 0){
                dispatch(encounterActions.engageEncounter({selectBall: 'ultball'}))
              }
              break;
            default: return
          }
    }
}

export const encounterIsPlayerRetrying = (retry) => {
    return (dispatch) => {
        if(!retry){
            return {duration: 1, timeOut: 3000}
        } else return{duration: 0, timeOut: 0}
    }
}

export const encounterSliderTap  = (poundX, targetX, targetWidth) => {
    return (dispatch) => {
        //miss, ok, great, perfect
        const tap = poundX - targetX
        if(tap < -targetWidth || tap > targetWidth){
            return {value: 0, text: 'miss', color: 'red'}
        } else{
            if((tap > -targetWidth/20 && tap <= 0) || (tap < targetWidth/20 && tap >= 0)){
                return {value: 30, text: 'perfect', color: 'darkturquoise'}
            }
            else if((tap > -targetWidth/4 && tap < 0) || (tap < targetWidth/4 && tap > 0)){
                return {value: 20, text: 'great', color: 'greenyellow'}
            }
            else {
                return {value: 10, text: 'ok', color: 'gold'}
            }
        }
    }
}

export const encounterSliderPlay = (pounder, slider, cr, passUpTap) => {
    return (dispatch) => {
        const maxWidth = parseInt(slider.current.style.maxWidth) 
        let swingCalc = Math.floor((255-cr)/6)
        let speedX = swingCalc < 10 ? 10 : swingCalc
        let posX = 0;
    
        const sliderSwing = () => {
            let pounderWidth = parseInt(pounder.current.style.width)
            let pounderPos = parseInt(pounder.current.style.left)
            if(pounderPos+pounderWidth >= maxWidth || pounderPos <= 0) speedX = speedX * (-1)
            posX += speedX
            pounder.current.style.left = `${posX}px`;
        }

        document.addEventListener('keydown', passUpTap)
        return setInterval(sliderSwing, 1000/60)
    }
  }

export const encounterSliderStop = (intervalSwingId, passUpTap, healthReducer) => {
    return (dispatch) => {
        console.log(healthReducer)
        clearInterval(intervalSwingId)
        document.removeEventListener('keydown', passUpTap)
        setTimeout(() => {
            dispatch(encounterActions.attemptCatch({healthReducer: healthReducer}))
        }, 2000)
    }
}

export const encounterRollForCatch = (poke, reducer, ball) => {
    return dispatch => {
        const maxCaptureRate = 255
        const hp = poke.stats[0].base_stat
        const percent = (100 - reducer) * 0.01
        const hpCurrent = hp * percent
        const rate = poke.capture_rate
        const ballMulti = 1
        const a = (hp*4 - hpCurrent)*rate*ballMulti
        const calculatedRate = Math.floor(a/(hp*2))
        const shakes = Math.floor(Math.random() * 3) + 1

        // return {caught: true, shakes: 1}

        if(calculatedRate >= maxCaptureRate){return {caught: true, shakes: 3}}

        const roll = Math.floor(Math.random() * maxCaptureRate) + 1
        
        if(roll <= calculatedRate) return {caught: true, shakes: 3}
        else return {caught: false, shakes}
    }
}

export const encounterCatchOrFail = (poke, tryPokeBall, tryPokePoke, healthReducer, ball) => {
    return async(dispatch) => {
            try{
                dispatch(inventoryActions.removePokeball())
                const catchRoll = dispatch(encounterRollForCatch(poke, healthReducer, ball))
    
                await tryPokeAnim(tryPokeBall, tryPokePoke)
                dispatch(encounterActions.setCatchText({caught: 'pending', text: "ball is shaking..."}))
                await shakeBallAnim(tryPokeBall, catchRoll.shakes)
    
                if(!catchRoll.caught){
                    dispatch(encounterActions.setCatchText({caught: 'false', text: "Failed to catch!"}))
                    await escapedPokemonAnim(tryPokeBall, tryPokePoke)
                    setTimeout(() => {dispatch(encounterActions.retryCatch())}, 1000)
                } else{
                    const saveRes = await savePokeReq(poke)
                    if(saveRes.success){
                        dispatch(encounterActions.setCatchText({caught: 'true', text: "You caught it!"}))
                        await caughtPokeAnim(tryPokeBall)
                        setTimeout(async() => {
                            dispatch(myPokemonActions.addPokemon({poke}))
                            dispatch(stopEncounterInit())
                        }, 1000)
                    }
                }
            } catch(err){
                alert('Error during catch. Check log.', err.message)
                console.log(err)
                setTimeout(async() => dispatch(stopEncounterInit(), 1000))
            }
        }   
    }