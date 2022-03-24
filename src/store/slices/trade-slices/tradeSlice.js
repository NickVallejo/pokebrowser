import { createSlice } from "@reduxjs/toolkit";

const initState = {srcResults: undefined}

const tradeSlice = createSlice({
    name: 'trades',
    initialState: initState,
    reducers: {
        tradeResultsSearch(state, action){
            state.srcResults = action.payload.results
        },
        tradeResultsModify(state, action){
            const index = state.srcResults.findIndex(res => res._id == action.payload._id)
            if(index != -1) state.srcResults[index].active_trade = action.payload.trade
        },
        cleanupResults(state, action){
            state.srcResults = initState.srcResults
        }
    }
})

export default tradeSlice