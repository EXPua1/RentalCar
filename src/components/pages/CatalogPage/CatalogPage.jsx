import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBrands } from '../../../redux/cars/operations';
import { selectBrands } from '../../../redux/cars/selectors';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands)

  useEffect(() => {
    dispatch(fetchBrands());

  }, [dispatch]);

  return (

    <div>
      <h1>Car Brands</h1>
      <label htmlFor="brand">Car brand</label>
      <select>
        {brands.map((brand, idx) => (
          <option key={idx} value={brand}>{brand}</option>
        ))}
      </select>
    </div>
  )
}

export default CatalogPage