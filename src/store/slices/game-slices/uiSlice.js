import { createSlice } from "@reduxjs/toolkit";

const initState = {small: undefined, window: 'playermenu', showTut: false}

const uiSlice = createSlice({
    name: 'ui',
    initialState: initState,
    reducers: {
        toggleWidth(state, action){
            state.small = action.payload
        },
        switchMenu(state, action){
            state.window = action.payload
        },
        toggleTut(state, action){
            state.showTut = action.payload
        }
    }
})

export default uiSlice