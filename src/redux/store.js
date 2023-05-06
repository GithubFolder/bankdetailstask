import { configureStore } from "@reduxjs/toolkit";
import bankDetailsSlice from './BankSlice';

export const store = configureStore({
    reducer: bankDetailsSlice,
})