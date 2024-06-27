import { configureStore } from "@reduxjs/toolkit";
import Application from "../components/Application";
import AppSlice from "./AppSlice";

export const Store = configureStore({
    reducer:{
        appSlice:AppSlice
    }
})
Store.subscribe(() => {
    let state = Store.getState();
    console.log(state)
})