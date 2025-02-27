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
  const cars = useSelector((state) => state.cars.cars);
  const filters = useSelector((state) => state.cars.filters);
  const totalPages = useSelector((state) => state.cars.totalPages)
  const loading = useSelector((state) => state.cars.loading);
  const [page, setPage] = useState(1);


  useEffect(() => {

    if (cars.length === 0) {
      dispatch(fetchCars());
    }

    dispatch(fetchBrands());
  }, [dispatch]);

 

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); 
    dispatch(fetchCars({ page: page + 1 }));

  };
  const isLastPage = page >= totalPages;
  return (
    <Container>
      <CarSearch setPage={setPage} />
      <CarCard />

      {page < totalPages && (
        
        <Button
          size="small"
          text={loading ? "Loading..." : "Load More"}
          transparent={true}
          center={true}
          onClick={handleLoadMore}
          disabled={loading || isLastPage}
        />
      )}
    </Container>
  );
};

export default CatalogPage;
