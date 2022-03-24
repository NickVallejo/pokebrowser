import audioEncounter from "./audio-encounter"
import audioTitle from "./audio-title"
const encMusic = new Audio(audioEncounter['encMusic'])
const fieldMusic = new Audio(audioEncounter['fieldMusic'])
const titleMusic = new Audio(audioTitle['titleMusic'])
encMusic.loop = true
fieldMusic.loop = true
titleMusic.loop = true

export const encounterMusicToggle = (on) => {
    // if(on) {
    //     encMusic.volume = 1
    //     encMusic.play()
    // }
    // else{
    //     const volumeDown = setInterval(() => {
    //         console.log(encMusic.volume)
    //         if(encMusic.volume > 0.1) encMusic.volume -= 0.1
    //         else {
    //             encMusic.pause()
    //             encMusic.currentTime = 0;
    //             clearInterval(volumeDown)
    //             fieldMusicToggle(true)
    //         }
    //     }, 200)
    // }
}

export const fieldMusicToggle = (on) => {
    // if(on) fieldMusic.play()
    // else{
    //     fieldMusic.pause()
    //     fieldMusic.currentTime = 0
    // }
}

export const titleMusicToggle = (on) => {
    // if(on) titleMusic.play()
    // else{
    //     titleMusic.pause()
    //     titleMusic.currentTime = 0
    // }
}