import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://car-rental-api.goit.global/';

export const fetchBrands = createAsyncThunk(
  'cars/fetchBrands',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/brands');
      
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (
    { brand, rentalPrice, mileage, limit = 12 }, // Правильное значение по умолчанию
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();

      if (brand) params.append('brand', brand);
      if (rentalPrice) params.append('rentalPrice', rentalPrice);

      if (mileage?.minMileage) params.append('minMileage', mileage.minMileage);
      if (mileage?.maxMileage) params.append('maxMileage', mileage.maxMileage);

      // Добавляем limit в конец URL
      const url = `https://car-rental-api.goit.global/cars?${params.toString()}&limit=${limit}`;
      console.log('Request URL: ', url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Error in fetching data');
      }

      const { cars } = await response.json();
      console.log('Fetched data: ', cars);
      return cars;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

