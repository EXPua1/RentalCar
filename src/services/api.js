import axios from 'axios';

axios.defaults.baseURL = 'https://car-rental-api.goit.global/';

export const fetchCar = async id => {
  const { data } = await axios.get(`/cars/${id}`);

  return data;
};
