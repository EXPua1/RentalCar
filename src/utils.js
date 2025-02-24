export function handleError(state, action) {
  state.loading = false;
  state.error = action.payload || action.error.message;
}

export function handleSuccess(state, action) {
  state.loading = false;
  state.error = null;
  state.cars = action.payload;
}

export function handleLoading(state) {
  state.loading = true;
  state.error = null;
}