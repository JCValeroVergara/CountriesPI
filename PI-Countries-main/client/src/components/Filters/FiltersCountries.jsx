import React from 'react';
import style from './FiltersCountries.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterByContinent, filterByTypeActivity, resetState } from '../../redux/actions';
import { orderByName, orderByPopulation } from '../../redux/actions';

const FilterCountries = ({setCurrentPage}) => {


     const dispatch = useDispatch();
     const [ orden,setOrden] = useState('');
     
     const [filters, setFilters] = useState({
          continent: '',
          typeActivity: '',
          population: '',
          name: '',   
          });
  
     const resetStates = () => {
          setFilters({
            continent: '',
            typeActivity: '',
            population: '',
            name: '',
          });
     }
   
   const handleRestore = () => {
      dispatch(resetState());
      dispatch(orderByName("None"));
      dispatch(orderByPopulation('None'));
      resetStates()
   };

  const handleContinentFilter = (event) => {
    dispatch(filterByContinent(event.target.value));
     setFilters({ ...filters, continent: event.target.value });
     setCurrentPage(1)
  };

  const handleTypeActiviteFilter = (event) => {
     const value = event.target.value;
     
     dispatch(filterByTypeActivity(value));
     setCurrentPage(1)
       setOrden(value);
       setFilters({
         ...filters,
         typeActivity: value,
       });
  };
  
     
     
     

  return (
    <div className={style.container}>
      <div>
        <button className={style.button} onClick={handleRestore}>
          Restore
        </button>
      </div>
      <div>
        <select
          onChange={handleContinentFilter}
          value={filters.continent}
          className={style.select}
        >
          <option value="All">Filter by continent</option>
          <option value="South America">América del Sur</option>
          <option value="North America">América del Norte</option>
          <option value="Africa">África</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceanía</option>
          <option value="Antarctica">Antártica</option>
        </select>
      </div>
      <div>
        <select
          onChange={handleTypeActiviteFilter}
          value={orden}
          className={style.select}
        >
          <option value="All">Filter by Activity Type</option>
          <option value="Outdoor">Outdoor</option>
          <option value="Adventure">Adventure</option>
          <option value="Shopping">Shopping</option>
          <option value="Cultural">Cultural</option>
          <option value="Watersports">Water sports</option>
          <option value="Winter sports">Winter sports</option>
          <option value="Entertainment">Entertainmenta</option>
          <option value="Gastronomy">Gastronomy</option>
          <option value="Historical">Historical</option>
          <option value="Nature">Nature</option>
        </select>
      </div>
    </div>
  );
};

export default FilterCountries;










