import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [], 
  filters: {
    brand: null,
    price: null,
    mileage: { from: null, to: null },
  },
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
});

export const { toggleFavorite, setFilters, resetFilters } = carsSlice.actions;
export const cars = carsSlice.reducer;
