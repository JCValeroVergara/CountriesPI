import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterByContinent, filterByTypeActivity } from '../../redux/actions';

const FilterCountries = (props) => {


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
          

  const handleContinentFilter = (event) => {
    dispatch(filterByContinent(event.target.value));
    setFilters({ ...filters, continent: event.target.value });
  };

  const handleTypeActiviteFilter = (event) => {
     const value = event.target.value;
     console.error(value);
       dispatch(filterByTypeActivity(value));
       setOrden(value);
       setFilters({
         ...filters,
         typeActivity: value,
       });
  };
  
     
     
     

  return (
       <div>
            <div>
                 <button onClick={()=>{resetStates()}}>Restore</button>
            </div>
      <div>
        Filter by continent :
        <select onChange={handleContinentFilter} value={filters.continent}>
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
      <div>
        Filter by Activity Type
        <select
          onChange={handleTypeActiviteFilter}value={orden}>
          <option value="All">Todos</option>
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










