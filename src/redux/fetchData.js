import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com/products/category',
});

export const fetchData = createAsyncThunk(
  'store/fetchData',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/mens-shirts');
      return response.data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
