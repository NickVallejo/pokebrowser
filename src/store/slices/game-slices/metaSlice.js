import { createSlice } from "@reduxjs/toolkit";

const initState = {user: undefined}

const metaSlice = createSlice({
    name: 'usermeta',
    initialState: initState,
    reducers: {
        setUserDataOnload(state, action){
            state.user = action.payload.user
        }
    }
})

export default metaSlice