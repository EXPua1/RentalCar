import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Select, MenuItem, FormControl, InputAdornment } from "@mui/material";
import css from "./CarSearch.module.css";
import { fetchCars } from "../../redux/cars/operations";
import { resetFilters, setFilters } from "../../redux/cars/carsSlice";

const CarSearch = () => {
  const dispatch = useDispatch();

  const brands = useSelector((state) => state.cars.brands);
  const loading = useSelector((state) => state.cars.loading);
  const error = useSelector((state) => state.cars.error);
  const filters = useSelector((state) => state.cars.filters);

  const [brand, setBrand] = useState(filters.brand);
  const [price, setPrice] = useState(filters.price);
  const [mileageFrom, setMileageFrom] = useState(filters.mileage?.from || '');
  const [mileageTo, setMileageTo] = useState(filters.mileage?.to || '');

  const formatNumber = (num) => {
    if (!num) return '';
    // Форматируем число с запятой
    return new Intl.NumberFormat().format(num);
  };

  useEffect(() => {
    dispatch(fetchCars(filters));
  }, [dispatch]);

  const handleSearch = () => {
    const cleanMileageFrom = mileageFrom ? mileageFrom.replace(/[^\d]/g, '') : '';
    const cleanMileageTo = mileageTo ? mileageTo.replace(/[^\d]/g, '') : '';

    const filters = {
      brand,
      rentalPrice: price,
      mileage: {
        minMileage: cleanMileageFrom,
        maxMileage: cleanMileageTo
      }
    };

    dispatch(resetFilters());
    dispatch(setFilters(filters));
    dispatch(fetchCars({ ...filters, limit: 55 }));
  };

  const handleInputChange = (e, setter) => {
    let value = e.target.value;
    // Убираем все символы, кроме цифр
    value = value.replace(/[^\d]/g, '');
    setter(formatNumber(value));
  };

  return (
    <div className={css.container}>
      <div>
        <p className={css.title}>Car brand</p>
        <FormControl fullWidth>
          <Select
            value={brand || ""}
            onChange={(e) => setBrand(e.target.value)}
            displayEmpty
            sx={{
              fontSize: "16px", height: "44px", width: "204px",
              padding: '0px'
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  
                  maxHeight: 272, // максимальная высота выпадающего списка
                  overflowY: 'auto', // добавление прокрутки, если список превышает maxHeight
                },
              },
            }}
          >
            <MenuItem value="" disabled>
              Choose a brand
            </MenuItem>
            {brands.map((brand, idx) => (
              <MenuItem key={idx} value={brand} sx={{
               
                fontSize: '16px',
                color: '#8D929A',
                paddingTop: 0, // Убирает отступ сверху
                paddingBottom: 0, // Убирает отступ снизу
              }}>
                {brand}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div>
        <p className={css.title}>Price/ 1 hour</p>
        <FormControl fullWidth>
          <Select
            value={price || ""}
            onChange={(e) => setPrice(e.target.value)}
            displayEmpty
            sx={{ fontSize: "16px", height: "44px", width: "204px" }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300, // максимальная высота выпадающего списка
                  overflowY: 'auto', // добавление прокрутки, если список превышает maxHeight
                },
              },
            }}
          >
            <MenuItem value="" disabled>
              Select price
            </MenuItem>
            {[30, 40, 50, 60, 70, 80, 90, 100].map((price) => (
              <MenuItem key={price} value={price} sx={{

                fontSize: '16px',
                color: '#8D929A',
                paddingTop: 0, // Убирает отступ сверху
                paddingBottom: 0, // Убирает отступ снизу
              }}>
                {price}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div>
        <p className={css.title}>Car mileage / km</p>
        <Input
          value={mileageFrom}
          onChange={(e) => handleInputChange(e, setMileageFrom)}
          startAdornment={<InputAdornment position="start">From</InputAdornment>}
          sx={{
            height: "44px",
            width: "160px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            paddingLeft: "10px",
          }}
        />
      </div>

      <div>
        <Input
          value={mileageTo}
          onChange={(e) => handleInputChange(e, setMileageTo)}
          startAdornment={<InputAdornment position="start">To</InputAdornment>}
          sx={{
            height: "44px",
            width: "160px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            paddingLeft: "10px",
          }}
        />
      </div>

      <Button onClick={handleSearch} disabled={loading} sx={{
        borderRadius: '12px',
        padding: '12px 51px',
        width: '156px',
        background: 'var(--button)',
        color: 'white',
        marginLeft: '16px'
      }}>
        {loading ? "Loading..." : "Search"}
      </Button>

      {error && <div>{error}</div>}
    </div>
  );
};

export default CarSearch;
