import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCar } from '../../../services/api';
import { CircularProgress, Container, Typography } from '@mui/material';
import CarImage from '../../CarImage/CarImage';
import CarWrapper from '../../CarWrapper/CarWrapper';
import CarDetails from '../../CarDetails/CarDetails';
import CarPrice from '../../CarPrice/CarPrice';
import CarWrapperInfo from '../../CarWrapperInfo/CarWrapperInfo';

const CatalogDetails = () => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchOneCar = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchCar(id);
        setCar(response);
      } catch {
        setError('Failed to load car data');
      } finally {
        setLoading(false);
      }
    };

    fetchOneCar();
  }, [id]);

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: loading ? '100vh' : 'auto',
        mt: error || !car ? 4 : 0,
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : !car ? (
        <Typography color="textSecondary">Car not found</Typography>
      ) : (
        <CarWrapper>

          <CarImage car={car} />
          <CarWrapperInfo>
            <CarDetails car={car} />
            <CarPrice car={car} />
          </CarWrapperInfo>



        </CarWrapper>
      )}
    </Container>
  );
};

export default CatalogDetails;