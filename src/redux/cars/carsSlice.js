import { createSlice } from '@reduxjs/toolkit';
import { fetchBrands, fetchCars } from './operations';
import { handleError, handleLoading } from '../../utils';

const initialState = {
  cars: [],
  brands: [],
  favourites: [],
  filters: {
    brand: null,
    rentalPrice: null,
    mileage: { from: null, to: null },
  },
  loading: false,
  error: null,
  totalPages: 0,
  totalCars: 0,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const carId = action.payload;
      const car = state.cars.find(car => car.id === carId);
      const isFavourite = state.favourites.some(
        favorite => favorite.id === carId
      );

      if (isFavourite) {
        state.favourites = state.favourites.filter(
          favourite => favourite.id !== carId
        );
      } else {
        state.favourites.push(car);
      }
    },
    clearFavorites: state => {
      state.favourites = [];
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: state => {
      state.filters = initialState.filters;
    },
    cleanCars: state => {
      state.cars = [];
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

      
      .addCase(fetchCars.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = [...state.cars, ...action.payload.cars]; 
        state.totalPages = action.payload.totalPages;
        state.totalCars = action.payload.totalCars;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleFavorite, setFilters, resetFilters, cleanCars} = carsSlice.actions;

export const cars = carsSlice.reducer;
