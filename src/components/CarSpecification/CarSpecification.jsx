import React from 'react'
import css from './CarSpecification.module.css'
import { Icon } from '@iconify/react'

const CarSpecification = ({ car }) => {
    return (
        <div>
            <h2 className={css.title}>Car Specifications:</h2>

            <ul className={css.list}>
                <li>
                    <p className={css.itemInner}>
                        <Icon icon="ri:calendar-line" width="16" height="16" />
                        Year: {car.year}
                    </p>
                </li>
                <li>
                    <p className={css.itemInner}>
                        <Icon icon="ri:roadster-fill" width="16" height="16" />
                        Type: {car.type}
                    </p>
                </li>
                <li>
                    <p className={css.itemInner}>
                        <Icon icon="ri:gas-station-fill" width="16" height="16" />
                        Fuel Consumption: {car.fuelConsumption}
                    </p>
                </li>
                <li>
                    <p className={css.itemInner}>
                        <Icon icon="ri:settings-4-line" width="16" height="16" />
                        Engine Size: {car.engineSize}
                    </p>
                </li>
            </ul>
        </div>
    )
}

export default CarSpecification