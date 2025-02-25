import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands, fetchCars } from '../../../redux/cars/operations';
import { selectBrands } from '../../../redux/cars/selectors';
import Container from '../../Container/Container';

import css from './CatalogPage.module.css';
import CarSearch from '../../CarSearch/CarSearch';
import CarCard from '../../CarCard/CarCard';
import Button from '../../Button/Button';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.cars.filters);

  useEffect(() => {
    dispatch(fetchCars(filters));
    dispatch(fetchBrands());
  }, [dispatch]);


  return (
    <Container>
      <CarSearch />
      <CarCard />
      <Button size={'small'} text={'Load More'} transparent={true} center={true} />
    </Container >
  );
};

export default CatalogPage;
