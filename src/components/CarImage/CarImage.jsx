import React from 'react'
import css from './CarImage.module.css'
const CarImage = ({car}) => {
  return (
      <div className={css.image_Container}>
          <img src={car.img} alt={car.model} />
    </div>
  )
}

export default CarImage