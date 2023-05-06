import {createSlice} from "@reduxjs/toolkit";

import {GetAllBankThunkApi, GetBankBranchThunkApi ,AddBankDertailsThunkApi } from './reduxThunkApi/BankService';




const bankDetailsSlice = createSlice({
    name : 'bankdetails',
    initialState:{
        data:[],
        // bankdata:[],
        bankDetails:[],
        allCustomers:[],
        accountTypes:[],
        bankNames:[],
        loading:false,
    },
    extraReducers:{
        [GetAllBankThunkApi.pending]:(state,action) => {
            state.loading = true;
            console.log(action);
        },
            [GetAllBankThunkApi.fulfilled]:(state,action) => {
            console.log(action);
            state.loading = false;
            // if(state.status.payload == 1){
                state.bankDetails = action.payload.data.bankDetails;
                state.allCustomers = action.payload.data.allCustomers;
                state.bankNames = action.payload.data.bankNames;
                state.accountTypes = action.payload.data.accountTypes;
            // state.bankDetails = action.payload.data.bankDetails;
            // }
            // console.log(bankdata);
        },
            [GetAllBankThunkApi.rejected]:(state,action) =>{
            state.loading = false;
        },


        //Getting the bank branch code
        [ GetBankBranchThunkApi.pending]:(state,action) => {
                state.loading = true;
            },
            [ GetBankBranchThunkApi.fulfilled]:(state,action) => {
                console.log(action);
                state.loading = false;
                state.branchList = action.payload.data.branch_list;
            },
            [ GetBankBranchThunkApi .rejected]:(state,action) => {
                state.loading = false;
            },

            

             // Add Bank Details 
        [AddBankDertailsThunkApi .pending]:(state,action) => {
            state.loading = true;
        },
        [AddBankDertailsThunkApi .fulfilled]:(state,action) => {
            console.log(action);
            state.loading = false;
            state.bankDetails  = action.payload.data.bankDetails;

        },
        [AddBankDertailsThunkApi .rejected]:(state,action) => {
            state.loading = false;
        },  
       
    },
})

export default  bankDetailsSlice.reducer;