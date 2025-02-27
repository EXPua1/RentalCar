import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Select, MenuItem, FormControl, InputAdornment } from "@mui/material";
import css from "./CarSearch.module.css";
import { fetchCars } from "../../redux/cars/operations";
import { cleanCars, resetFilters, setFilters } from "../../redux/cars/carsSlice";

const CarSearch = ({ setPage }) => {
  const dispatch = useDispatch();

  const prises = [30, 40, 50, 60, 70, 80, 90, 100, 110]

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



  const handleSearch = () => {
    const cleanMileageFrom = mileageFrom ? mileageFrom.replace(/[^\d]/g, '') : '';
    const cleanMileageTo = mileageTo ? mileageTo.replace(/[^\d]/g, '') : '';

    const filters = {
      ...(brand !== "All" && brand && { brand }),
      ...(price && price !== "Any" && { rentalPrice: price }),
      ...(cleanMileageFrom || cleanMileageTo
        ? { mileage: { minMileage: cleanMileageFrom || undefined, maxMileage: cleanMileageTo || undefined } }
        : {}),
    };

    setPage(1);
    dispatch(cleanCars());
    dispatch(resetFilters());
    dispatch(setFilters(filters));


    if (Object.keys(filters).length === 0) {
      dispatch(fetchCars({ page: 1 }));
    } else {
      dispatch(fetchCars({ ...filters, limit: 100, page: 1 }));
    }
  };

  const handleInputChange = (e, setter) => {
    let value = e.target.value;

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
              padding: '0px',
              marginRight: '16px',
              background: "var(--inputs);",
              borderRadius: "12px",
              border: "none",
              "& .MuiSelect-root": {
                padding: "0px",  // Убираем внутренние отступы
                border: "none",  // Убираем бордер
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",  // Убираем обводку
              },
            }}
            MenuProps={{
              PaperProps: {
                style: {

                  maxHeight: 272,
                  overflowY: 'auto',
                  marginTop: '4px'
                },
              },
            }}
          >
            <MenuItem value="" disabled>
              Choose a brand
            </MenuItem>
            {["All", ...brands].map((brand, idx) => (

              <MenuItem key={idx} value={brand} sx={{

                fontSize: '16px',
                color: '#8D929A',
                paddingTop: 0,
                paddingBottom: 0,
                
                

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
            sx={{
              fontSize: "16px", height: "44px", width: "204px",
              padding: '0px',
              marginRight: '16px',
              background: "var(--inputs);",
              borderRadius: "12px",
              border: "none",
              "& .MuiSelect-root": {
                padding: "0px",  // Убираем внутренние отступы
                border: "none",  // Убираем бордер
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",  // Убираем обводку
              },
            }}

            MenuProps={{
              PaperProps: {
                style: {

                  maxHeight: 272,
                  overflowY: 'auto',
                  marginTop: '4px'
                },
              },
            }}
          >
            <MenuItem value="" disabled>
              Select price
            </MenuItem>
            {["Any", ...prises].map((price) => (
              <MenuItem key={price} value={price} sx={{

                fontSize: '16px',
                color: '#8D929A',
                paddingTop: 0,
                paddingBottom: 0,

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
          disableUnderline
          sx={{
            height: "44px",
            width: "160px",
            borderRight: "1px solid var(--gray-light);",
            borderRadius: "12px 0 0 12px;",
            paddingLeft: "10px",
            background: "var(--inputs);"

          }}
        />
      </div>

      <div>
        <Input
          value={mileageTo}
          onChange={(e) => handleInputChange(e, setMileageTo)}
          startAdornment={<InputAdornment position="start">To</InputAdornment>}
          disableUnderline={true}
          sx={{
            fontFamily: 'var(--font-family)',
            height: "44px",
            width: "160px",
            borderRight: "1px solid var(--gray-light);",
            borderRadius: "0 12px 12px 0",
            paddingLeft: "10px",
            background: "var(--inputs);"

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
