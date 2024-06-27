import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name:'Application',
    initialState:{
        data:[],
        item:"",
    },
    reducers:{
        input:(state,action:PayloadAction<string>) => {
            state.item = action.payload;
        } ,
        submit:(state) => {
            state.data.push(state.item);
            console.log(state.data)
            
        }
    }
})
export const { input,submit } = appSlice.actions;
export default appSlice.reducer;