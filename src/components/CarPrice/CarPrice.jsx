import React from 'react'
import css from './CarPrice.module.css'

const CarPrice = ({ car }) => {
    return (
        <span>
            {car.rentalPrice}
        </span>
    )
}

export default CarPrice