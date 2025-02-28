export const selectBrands = state => state.cars.brands
export const selectCars = state => state.cars.cars
export const selectPrice = state => state.cars.filters.rentalPrice
export const selectMileage = state => state.cars.filters.mileage
export const selectFavourites = state => state.cars.favourites;
export const selectFilters = state => state.cars.filters