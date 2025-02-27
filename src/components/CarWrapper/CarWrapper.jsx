import React from 'react'
import css from './CarWrapper.module.css'
const CarWrapper = ({ children }) => {
    return (
        <div className={css.wrapper}>
            {children}
        </div>
            
        
      
    )
}

export default CarWrapper