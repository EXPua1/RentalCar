import React, { useEffect } from 'react'

import css from './HomePage.module.css'
import Button from '../../Button/Button'



const HomePage = () => {


    return (
        <main className={css.home}>
            <div>
                <div>
                    <h1 className={css.title}>Find your perfect rental car</h1>
                    <p className={css.description}>Reliable and budget-friendly rentals for any journey</p>
                    <Button text="View Catalog" to="/catalog" size="big" />
                </div>
            </div>

        </main>



    )
}

export default HomePage