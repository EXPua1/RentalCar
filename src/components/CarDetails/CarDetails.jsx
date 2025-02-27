import React from 'react'
import css from './CarDetails.module.css'
import { Icon } from '@iconify/react'
const CarDetails = ({ car }) => {
    return (
        <div>
            <div className={css.details}>
                <p className={css.name}>
                    {car.brand} {car.model}, {car.year}
                </p>
                <p className={css.id}> id: {car.id.split('-')[0]}</p>

            </div>
            <div className={css.location}>
                <div className={css.locationDetails}>
                    <Icon icon="ri:map-pin-2-line" width="16" height="16" />
                    <p className={css.address}>{car.address.split(",").slice(-2, -1)}, {car.address.split(",").slice(-1)} </p>

                </div>
                <div>
                    <p>{car.mileage.toLocaleString("ru-RU")} km</p>
                </div>

            </div>
        </div>

    )
}

export default CarDetails