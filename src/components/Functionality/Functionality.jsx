import React from 'react'
import css from './Functionality.module.css'
import { Icon } from '@iconify/react'

const Functionality = ({ car }) => {

    const accessoriesAndFunc = [...car.accessories, ...car.functionalities]

    return (
        <div>
            <h2 className={css.title}>Accessories and Functionalities</h2>
            <ul className={css.list}>
                {accessoriesAndFunc.map((item, index) => (
                    <li className={css.item} key={index}>
                        <Icon icon="ri:checkbox-circle-line" width="16" height="16" />
                        {item}</li>
                ))}
            </ul>
        </div>


    )
}

export default Functionality