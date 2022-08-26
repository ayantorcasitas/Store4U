import { createSlice } from "@reduxjs/toolkit";

export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";

export interface CounterState{
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 42,
    title: 'YARC (yet another redux counter with redux toolkit)'
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.data+=action.payload
        },
        decrement: (state, action) => {
            state.data-=action.payload
        },
        
    }
});

export const { increment, decrement } = counterSlice.actions;