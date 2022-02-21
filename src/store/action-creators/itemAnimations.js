import { fieldActions, inventoryActions } from "..";

export const byeItem = (playerPatch, x, y) => {
    return (dispatch) => {
            dispatch(fieldActions.removePokeballPosition({x, y}))
            playerPatch && dispatch(inventoryActions.addPokeball())
    }
}