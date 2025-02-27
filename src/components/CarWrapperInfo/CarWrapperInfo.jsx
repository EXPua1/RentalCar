import React from 'react'
import css from './CarWrapperInfo.module.css'

const CarWrapperInfo = ({children}) => {
    return (
      
        <div className={css.wrapper}>
            {children}</div>
  )
}

export default CarWrapperInfo