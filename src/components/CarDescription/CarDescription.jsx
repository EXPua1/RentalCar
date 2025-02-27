import React from 'react'
import css from './CarDescription.module.css'

const CarDescription = ({car}) => {
  return (
    <p className={css.description}> {car.description} </p>
  )
}

export default CarDescription