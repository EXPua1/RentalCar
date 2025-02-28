import { Container } from '@mui/material'
import React from 'react'
import CarCard from '../../CarCard/CarCard'
import { useSelector } from 'react-redux'
import { selectFavourites } from '../../../redux/cars/selectors'
import CarWrapper from '../../CarWrapper/CarWrapper'

const FavouritePage = () => {
 const favourites = useSelector(selectFavourites)


    return (
        <Container>

            <CarWrapper >
                <CarCard cars={favourites} favourite={true} />
            </CarWrapper>
           

        </Container>
    )
}

export default FavouritePage