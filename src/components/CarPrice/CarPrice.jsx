import React from 'react'
import css from './CarPrice.module.css'

const CarPrice = ({ car }) => {
    return (
        <div className={css.container}>
            <span className={css.price}>
                {car.rentalPrice}$
            </span>
        </div>

    )
}

export default CarPrice