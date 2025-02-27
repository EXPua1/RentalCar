import React from 'react'
import css from './RentalConditions.module.css'
import { Icon } from '@iconify/react'

const RentalConditions = ({ car }) => {
    return (
        <div>
            <h2 className={css.title}>Rental Conditions:</h2>
           
            {car.rentalConditions.map((condition, index) => (

                <p className={css.conditions} key={index}>
                    <Icon icon="ri:checkbox-circle-line" width="16" height="16"  />
                    {condition}</p>
            ))}
        </div>
    )
}

export default RentalConditions