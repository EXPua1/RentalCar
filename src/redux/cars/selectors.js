export const selectBrands = state => state.cars.brands
export const selectCars = state => state.cars.cars
export const selectPrice = state => state.cars.filters.rentalPrice
export const selectMileage = state => state.cars.filters.mileage
export const selectFavorites = state => state.cars.favorites
export const selectFilters = state => state.cars.filters