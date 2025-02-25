import { createSlice } from '@reduxjs/toolkit';
import { fetchBrands, fetchCars } from './operations';
import { handleError, handleLoading } from '../../utils';

const initialState = {
  cars: [],
  brands: [],
  favorites: [],
  filters: {
    brand: null,
    rentalPrice: null,
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
      .addCase(fetchBrands.rejected, handleError)

      // Добавляем обработку для fetchCars
      .addCase(fetchCars.pending, state => {
        state.loading = true;
        state.cars = []; // очищаем старые данные
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleFavorite, setFilters, resetFilters } = carsSlice.actions;

export const cars = carsSlice.reducer;
