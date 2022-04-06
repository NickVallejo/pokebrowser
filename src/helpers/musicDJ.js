import audioEncounter from "./audio-encounter"
import audioTitle from "./audio-title"
const encMusic = new Audio(audioEncounter['encMusic'])
const fieldMusic = new Audio(audioEncounter['fieldMusic'])
const titleMusic = new Audio(audioTitle['titleMusic'])
encMusic.loop = true
fieldMusic.loop = true
titleMusic.loop = true
let soundOn = true

document.addEventListener('soundOn', () => {
    soundOn = true
    fieldMusic.volume = 1
    titleMusic.volume = 1
    encMusic.volume = 1
    fieldMusic.play()
})

document.addEventListener('soundOff', () => {
    soundOn = false
    fieldMusic.volume = 0
    titleMusic.volume = 0
    encMusic.volume = 0
})

export const encounterMusicToggle = (on) => {
    if(on && soundOn) {
        fieldMusic.pause()
        fieldMusic.currentTime = 0
        if(soundOn) encMusic.volume = 1
        encMusic.play()
    }
    else{
        const volumeDown = setInterval(() => {
            if(encMusic.volume > 0.1) encMusic.volume -= 0.1
            else {
                encMusic.pause()
                encMusic.currentTime = 0;
                clearInterval(volumeDown)
                fieldMusicToggle(true)
                
                if(soundOn) encMusic.volume = 1
            }
        }, 200)
    }
}

export const fieldMusicToggle = (on) => {
    if(on && soundOn) {
        encMusic.pause()
        encMusic.currentTime = 0
        fieldMusic.play()
    }
    else{
        fieldMusic.pause()
        fieldMusic.currentTime = 0
    }
}

export const titleMusicToggle = (on) => {
    if(on && soundOn) titleMusic.play()
    else{
        titleMusic.pause()
        titleMusic.currentTime = 0
    }
}