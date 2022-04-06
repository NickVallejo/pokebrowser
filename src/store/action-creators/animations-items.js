import { fieldActions, inventoryActions } from "..";
import ballReq from "../../helpers/requests/ball-request";

export const byeItem = (playerPatch, x, y) => {
    return async (dispatch) => {
            dispatch(fieldActions.removePokeballPosition({x, y}))
            if(playerPatch) { 
                dispatch(inventoryActions.addPokeball())
                await ballReq(true)
            }
    }
}