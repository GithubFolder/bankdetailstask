import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const GetAllBankThunkApi = createAsyncThunk(
  'getBankData',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post("http://20.204.122.192:8080/stlap/get-all-bank-details", payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);


export const GetBankBranchThunkApi = createAsyncThunk(
    'getBankBranch',
    async (payload, thunkAPI) => {
      try {
        const response = await axios.post("http://20.204.122.192:8080/stlap/bmapp/get-bank-branches", payload);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
  );



  export const AddBankDertailsThunkApi = createAsyncThunk(
    'addBankDetails',
    async (payload, thunkAPI) => {
      try {
        const response = await axios.post("http://20.204.122.192:8080/stlap/add-bank-details", payload);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
  );