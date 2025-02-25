import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../../../redux/cars/operations';
import { selectBrands } from '../../../redux/cars/selectors';
import Container from '../../Container/Container';

import css from './CatalogPage.module.css';
import CarSearch from '../../CarSearch/CarSearch';
import CarCard from '../../CarCard/CarCard';

const CatalogPage = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);


  return (
    <Container>
      <CarSearch />
      <CarCard />
    </Container >
  );
};

export default CatalogPage;
