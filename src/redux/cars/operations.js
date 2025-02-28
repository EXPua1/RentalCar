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
    { brand, rentalPrice, mileage, page = 1, limit = 8 } ={},
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();

      if (brand) params.append('brand', brand);
      if (rentalPrice) params.append('rentalPrice', rentalPrice);
      if (mileage?.minMileage) params.append('minMileage', mileage.minMileage);
      if (mileage?.maxMileage) params.append('maxMileage', mileage.maxMileage);

      params.append('page', page); 
      params.append('limit', limit); 

      const url = `https://car-rental-api.goit.global/cars?${params.toString()}`;
     

      const response = await fetch(url);
      if (!response.ok) throw new Error('Error in fetching data');

      
      const { cars, totalCars, totalPages } = await response.json();
      

      
      return { cars, totalCars, totalPages };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
