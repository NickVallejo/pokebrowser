import { createSlice } from "@reduxjs/toolkit";

const initState = {field: {x: 30, y:  30}, array: {x: 0, y: 0}}

const playerSlice = createSlice({
    name: 'player',
    initialState: initState,
    reducers: {
        setPlayerArrayLocation(state, action){
            if(action.payload.axis === "y"){
                if(action.payload.dir === -1){
                    if(state.array.y-1 >= 0) {
                        state.array.y -= 1
                        state.field.y -= 100
                    }
                }
                else if(action.payload.dir === 1){
                    if(state.array.y+1 < action.payload.fieldSize) {
                        state.array.y += 1
                        state.field.y += 100
                    } 
                }
              } else if(action.payload.axis === "x"){
                if(action.payload.dir === -1){
                    if(state.array.x-1 >= 0) {
                        state.array.x -= 1
                        state.field.x -= 100
                    } 
                }
                else if(action.payload.dir === 1){
                    if(state.array.x+1 < action.payload.fieldSize) {
                        state.field.x += 100
                        state.array.x += 1
                    }
                }
              }
        },
    }
})

export default playerSlice