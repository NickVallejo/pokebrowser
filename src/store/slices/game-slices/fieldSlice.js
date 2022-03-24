import { createSlice } from "@reduxjs/toolkit";
import { fieldArray } from "../../../helpers/fieldArray";


const initSize = 6
const initField = fieldArray(initSize)
initField[0][0] = 1
const initState = {
    array: initField, 
    size: initSize, 
    prevPlayerPosition: {x: 0, y: 0},
    pokeballPositions: {},
}

const fieldSlice = createSlice({
    name: 'field',
    initialState: initState,
    reducers: {
        newPositionOnField(state, action){
            state.array[state.prevPlayerPosition.y][state.prevPlayerPosition.x] = 0
            state.array[action.payload.y][action.payload.x] = 1
            state.prevPlayerPosition.x = action.payload.x
            state.prevPlayerPosition.y = action.payload.y
        },
        newPokeballPosition(state, action){
            const {x, y} = action.payload
            state.pokeballPositions[x.toString()+y.toString()] = {x, y}
        },
        removePokeballPosition(state, action){
            const {x, y} = action.payload
            delete state.pokeballPositions[x.toString()+y.toString()]
        },
    }
})

export default fieldSlice