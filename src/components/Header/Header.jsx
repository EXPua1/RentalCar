import React from 'react'
import css from './Header.module.css'
import Container from '../Container/Container'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <header className={css.header}>
            <Container>
                <div className={css.headerInner} >
                    
                        <Link to="/">
                            <img src="/images/RentalCar.png" alt="" />
                        </Link>
                    
                    <nav className={css.navigation}>
                        <ul className={css.navigationList}>
                            <li>
                                <NavLink
                                    to="/favourite"
                                    className={({ isActive }) => isActive ? css.active : undefined}
                                >
                                    Favourite
                                </NavLink>
                            </li>
                            <li className={css.navigationItem}>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => isActive ? css.active : undefined}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/catalog"
                                    className={({ isActive }) => isActive ? css.active : undefined}
                                >
                                    Catalog
                                </NavLink>
                            </li>
                        </ul>
                    </nav>

                </div>
            </Container>
        </header>
    )
}

export default Header