import React from 'react'
import CarCardItem from '../CarCardItem/CarCardItem'
import { useSelector } from 'react-redux'
import { selectCars } from '../../redux/cars/selectors'
import css from './CarCard.module.css'

const CarCard = ({cars, favourite}) => {
 

    return (
       
            <ul className={css.list}>
                <CarCardItem cars={cars} favourite={favourite} />
            </ul>
        
       
    )
}

export default CarCard