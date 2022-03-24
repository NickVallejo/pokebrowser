import { playerActions } from "..";

export const playerMove = (moveCycle, fieldSize, key) => {
    return dispatch => {
        switch(key){
            case 39:
              moveCycle('right')
              dispatch(playerActions.setPlayerArrayLocation({axis: "x",  dir: 1, fieldSize}))
              break;
            case 38:
              moveCycle('up')
              dispatch(playerActions.setPlayerArrayLocation({axis: "y",  dir: -1, fieldSize}))
              break;
            case 40:
                moveCycle('down')
                dispatch(playerActions.setPlayerArrayLocation({axis: "y",  dir: 1, fieldSize}))
              break;
            case 37:
                moveCycle('left')
                dispatch(playerActions.setPlayerArrayLocation({axis: "x",  dir: -1, fieldSize}))
              break;
        }
    }
}

export const playerToggleMovement = (movePlayer, encounterStart) => {
    return (dispatch) => {
        encounterStart ? 
        document.removeEventListener("keydown", movePlayer) :
        document.addEventListener("keydown", movePlayer, {once: true})
    }
}