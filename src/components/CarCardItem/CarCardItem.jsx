import React from 'react';
import { useSelector } from 'react-redux';
import css from './CarCardItem.module.css';
import { selectMileage, selectPrice } from '../../redux/cars/selectors';
import Button from '../Button/Button';

const CarCardItem = ({ cars }) => {

    const priceFilter = useSelector(selectPrice);



    const filteredCars = cars.filter((car) => {

        if (!priceFilter) return true;


        return parseFloat(car.rentalPrice) === parseFloat(priceFilter); // Теперь сравниваем числа
    });



    return (
        <>
            {filteredCars.length > 0 ? (
                filteredCars.map((car, idx) => (
                    <li key={idx}>
                        <div>
                            <div >
                                <img className={css.image} src={car.img} alt={car.name} />
                            </div>
                            <div className={css.info}>
                                <div className={css.carInfo}>
                                    <p>{car.brand}</p>
                                    <p className={css.model}>{car.model},</p>
                                    <span className={css.year}>{car.year}</span>
                                </div>

                                <p>${car.rentalPrice} </p>
                            </div>
                            <div className={css.location}>
                                <p className={css.address}>
                                    {car.address.split(',').slice(-2, -1)}
                                </p>
                                <p className={css.addressCountry}>
                                    {car.address.split(',').slice(-1)}
                                </p>                 
                                <p className={css.company}>{car.rentalCompany}</p>
                            </div>
                            <div className={css.type}>
                                <p className={css.typeVehicle}>
                                    {car.type}
                                </p>
                                <p className={css.mileage}>{car.mileage.toLocaleString('ru-RU')}</p>
                            </div>
                            <Button text="View" to={`/catalog/${car.id}`} size="big" />
                        </div>
                    </li>
                ))
            ) : (
                <p>No cars found for this price</p>
            )}
        </>
    );
}

export default CarCardItem;
