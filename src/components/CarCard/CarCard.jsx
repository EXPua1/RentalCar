import React from 'react'
import CarCardItem from '../CarCardItem/CarCardItem'
import { useSelector } from 'react-redux'
import { selectCars } from '../../redux/cars/selectors'
import css from './CarCard.module.css'

const CarCard = () => {
    const cars = useSelector(selectCars)

    return (
        <ul className={css.list}>
            <CarCardItem cars={cars} />
        </ul>
    )
}

export default CarCard