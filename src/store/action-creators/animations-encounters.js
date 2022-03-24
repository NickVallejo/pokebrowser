import {gsap} from 'gsap'
import { useRef } from 'react'
import { SlowMo } from 'gsap/all'
import audioEncounter from '../../helpers/audio-encounter'

gsap.registerPlugin(SlowMo);

const escapedAudio = new Audio(audioEncounter['escape'])
const throwAudio = new Audio(audioEncounter['throwBall'])
const dropAudio = new Audio(audioEncounter['dropBall'])
const dropAudio2 = new Audio(audioEncounter['dropBall'])
const caughtAudio = new Audio(audioEncounter['caught'])
const shakeAudio1 = new Audio(audioEncounter['shakeBall'])
const shakeAudio2 = new Audio(audioEncounter['shakeBall'])
const shakeAudio3 = new Audio(audioEncounter['shakeBall'])
caughtAudio.volume = 0.7
dropAudio2.volume = 0.65

const tapBounce = (target, pounder, pokeImg, color) => {
    gsap.to(target.current, {
        scale: 0.8,
        repeat: 1,
        yoyo: true,
        duration: 0.1,
        boxShadow: `0 0 50px 1px ${color}`,
    })

    gsap.to(pounder.current, {
        scale: 0.8,
        repeat: 1,
        yoyo: true,
        duration: 0.1
    })

    gsap.to(pokeImg.current, {
        rotation: 180,
        y: -100,
        repeat: 1,
        yoyo: true,
        duration: 0.1,
        ease: "bounce.out"
    })
}

export const encounterStartAnim = (screen) => {
    gsap.timeline()
    .to(screen.current, {
        opacity: 1,
        repeat: 8,
        yoyo: true,
        duration: 0.25,
        ease: "bounce.out"
    })
    .to(screen.current, {
        opacity: 1,
        duration: 0.25,
        ease: "bounce.out"
    })
}

export const encounterMenuAnim = (startMenu, duration) => {
    gsap.timeline()
    .to(startMenu.current,  {
        opacity: 1,
        duration: duration,
        ease: "bounce.out"
    })
}

export const encounterBubbleAnim = (bubbleBox) => {
        gsap.to(bubbleBox.current, {
            opacity: 1,
            y: -55,
            duration: 0.5,
            ease: "bounce.out"
        })
}

export const tryPokeAnim = (tryPokeBall, tryPokePoke) => {
    return new Promise(resolve => {
        setTimeout(() => throwAudio.play(), 425)
        setTimeout(() => dropAudio.play(), 3200)
        setTimeout(() => dropAudio2.play(), 3380)

        gsap.timeline({onComplete: resolve})
        .to(tryPokeBall.current, {
            opacity: 1,
            duration: 0.5
        })
        .fromTo(tryPokeBall.current,  {
            y: -70,
            duration: 0.3,
            x: -14.5,
            rotate: 0,
            ease: "power.in"
        },
        {
            y: 50, 
            duration: 0.4,
            opacity: 1,
            x: -14.5,
            ease: "power.out"
        }
        ).to(tryPokeBall.current, {
            y: -14,
            duration: 2,
            ease: "slow(2)",
            rotate: 360    
        }).to(tryPokeBall.current, {
            y: 150,
            duration: 1,
            ease: "bounce.out",
        })
    
        setTimeout(() => {
            escapedAudio.play()
            gsap.timeline()
            .to(tryPokePoke.current, {
                duration: 5,
                filter: "brightness(100) contrast(100)",
            }).to(tryPokePoke.current, {
                duration: 0.3,
                opacity: 0,
                delay: -3.5
            })
        }, 800)
    })
}

export const shakeBallAnim = (tryPokeBall, shakes) => {
    return new Promise(resolve => {
        const shakesArray = [shakeAudio1, shakeAudio2, shakeAudio3]
        let counter = 1;

        setTimeout(() => {
            shakesArray[0].play()
            const shakeAudioInt = setInterval(() => {
                console.log(counter, shakes)
                if(counter > shakes-1){
                    clearInterval(shakeAudioInt)
                    return
                }
                shakesArray[counter].play()
                counter++
            }, 2400)
        }, 1200)

        setTimeout(() => {
            gsap.timeline({repeat: shakes-1, onComplete: resolve})
            .fromTo(tryPokeBall.current, {
                rotate: 340,
                yoyo: true,
                duration: 0.75,
            },{
                rotate: 360,
                yoyo: true,
                duration: 0.75,
            }).to(tryPokeBall.current, {
                delay: 1,
                duration: 0.75
            })
        }, 1200)
    })
}

export const caughtPokeAnim = (tryPokeBall) => {
    return new Promise(resolve => {
        caughtAudio.play()
        gsap.timeline({onComplete: resolve})
        .to(tryPokeBall.current, {
            yoyo: true,
            scale: 1.2,
            repeat: 1,
            duration: 0.05
        })
    })
}

export const escapedPokemonAnim = (tryPokeBall, tryPokePoke) => {
    return new Promise(resolve => {
        escapedAudio.play()
        gsap.timeline({onComplete: resolve})
        .to(tryPokeBall.current, {
            scale: 1.5,
            filter: "brightness(100) contrast(100)",
            opacity: 0,
            duration: 1.3
        }).fromTo(tryPokePoke.current, 
        {
            opacity: 0,
            scale: 0.95
        },
        {
            filter: "none",
            opacity: 1,
            duration: 1,
            scale: 1,
            delay: 0.5
        })
    })
}

export default {tapBounce}