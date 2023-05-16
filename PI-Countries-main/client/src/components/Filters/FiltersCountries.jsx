import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterByContinent } from '../../redux/actions';

const FilterCountries = () => {


  const dispatch = useDispatch();
  
  const [filters, setFilters] = useState({
    continent: '',
    population: '',
    name: ''    
  });
  

  const handleContinentFilter = (event) => {
    dispatch(filterByContinent(event.target.value));
    setFilters({ ...filters, continent: event.target.value });
  };

  

  return (
    <div>
      Buscar por Continentes
      <select        
        onChange={handleContinentFilter}
        value={filters.continent}
      >
        <option value="All">Todos</option>
        <option value="South America">América del Sur</option>
        <option value="North America">América del Norte</option>
        <option value="Africa">África</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europa</option>
        <option value="Oceania">Oceanía</option>
        <option value="Antarctica">Antártica</option>
      </select>
    </div>
  );
};

export default FilterCountries;
