import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../../redux/cars/carsSlice"; // Импортируем экшен
import css from "./CarCardItem.module.css";
import Button from "../Button/Button";
import { selectFavourites, selectPrice } from "../../redux/cars/selectors";

const CarCardItem = ({ cars, favourite = false }) => {
    const dispatch = useDispatch();
    const favourites = useSelector(selectFavourites);
    const priceFilter = useSelector(selectPrice);

    const filteredCars = cars.filter((car) => {
        if (!priceFilter) return true;

        return parseFloat(car.rentalPrice) === parseFloat(priceFilter);
    });

    const handleFavoriteClick = (carId) => {
        dispatch(toggleFavorite(carId));
    };

    return (
        <>
            {filteredCars.length > 0 ? (
                filteredCars.map((car) => {
                    const isFavourites = favourites.some((favourite) => favourite.id === car.id);

                    return (
                        <li className={css.item} key={car.id}>
                            <div>
                                <div className={css.imageWrapper}>
                                    <img className={css.image} src={car.img} alt={car.name} />
                                    <button
                                        className={`${css.favorite} ${isFavourites ? css.active : ""}`}
                                        onClick={() => handleFavoriteClick(car.id)}
                                    >
                                        <img
                                            className={css.favoriteImg}
                                            src={isFavourites ? "1.svg" : "heart.svg"}
                                            alt="Favorite"
                                        />
                                    </button>
                                </div>
                                <div className={css.info}>
                                    <div className={css.carInfo}>
                                        <p>{car.brand}</p>
                                        <p className={css.model}>{car.model.split(' ')[0]},</p>
                                        <span className={css.year}>{car.year}</span>
                                    </div>
                                    <p>${car.rentalPrice} </p>
                                </div>
                                <div className={css.location}>
                                    <p className={css.address}>{car.address.split(",").slice(-2, -1)}</p>
                                    <p className={css.addressCountry}>{car.address.split(",").slice(-1)}</p>
                                    <p className={css.company}>{car.rentalCompany}</p>
                                </div>
                                <div className={css.type}>
                                    <p className={css.typeVehicle}>{car.type}</p>
                                    <p className={css.mileage}>{car.mileage.toLocaleString("ru-RU")}</p>
                                </div>
                                <Button text="View" to={`/catalog/${car.id}`} size="big" />
                            </div>
                        </li>
                    );
                })
            ) : (
                    <p className={css.favouriteMessage}>{favourite ? "No favourites auto, add first" : "No cars found for this price"}</p>
            )}
        </>
    );
};

export default CarCardItem;