import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCar } from '../../../services/api';
import { CircularProgress, Typography } from '@mui/material';
import CarImage from '../../CarImage/CarImage';
import CarWrapper from '../../CarWrapper/CarWrapper';
import CarDetails from '../../CarDetails/CarDetails';
import CarPrice from '../../CarPrice/CarPrice';
import CarWrapperInfo from '../../CarWrapperInfo/CarWrapperInfo';
import Container from '../../Container/Container';
import CarDescription from '../../CarDescription/CarDescription';
import RentalConditions from '../../RentalConditions/RentalConditions';
import CarSpecification from '../../CarSpecification/CarSpecification';
import Functionality from '../../Functionality/Functionality';
import BookingForm from '../../BookingForm/BookingForm';

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

    >
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : !car ? (
        <Typography color="textSecondary">Car not found</Typography>
      ) : (
        <CarWrapper>
          <CarWrapperInfo >
            <CarImage car={car} />
            <BookingForm />
          </CarWrapperInfo>

          <CarWrapperInfo>
            <CarDetails car={car} />
            <CarPrice car={car} />
            <CarDescription car={car} />
            <RentalConditions car={car} />
            <CarSpecification car={car} />
            <Functionality car={car} />
          </CarWrapperInfo>



        </CarWrapper>
      )}
    </Container>
  );
};

export default CatalogDetails;