import { createSlice } from '@reduxjs/toolkit';
import { fetchBrands } from './operations';
import { handleError, handleLoading } from '../../utils';

const initialState = {
  cars: [],
  brands: [],
  favorites: [],
  filters: {
    brand: null,
    price: null,
    mileage: { from: null, to: null },
  },
  loading: false,
  error: null,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const carId = action.payload;
      if (state.favorites.includes(carId)) {
        state.favorites = state.favorites.filter(id => id !== carId);
      } else {
        state.favorites.push(carId);
      }
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: state => {
      state.filters = initialState.filters;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchBrands.pending, handleLoading)
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })

      .addCase(fetchBrands.rejected, handleError);
  },
});

export const { toggleFavorite, setFilters, resetFilters} =
  carsSlice.actions;

export const cars = carsSlice.reducer;
