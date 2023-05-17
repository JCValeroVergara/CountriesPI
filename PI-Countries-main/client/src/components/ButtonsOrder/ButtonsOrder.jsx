
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { orderByName,orderByPopulation} from '../../redux/actions';


const ButtonsOrder = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    continent: '',
    population: '',
    name: '',
  });

    const handleSort = (event) => {
      dispatch(orderByName(event.target.value));
      setFilters({ ...filters, name: event.target.value });
      
  };
    
   const handleSortPopulation = (event) => {
     dispatch(orderByPopulation(event.target.value));
     setFilters({ ...filters, population: event.target.value });
   };

  return (
    <div>
      <div>
        Orden Alfabético
        <select onChange={handleSort} value={filters.name}>
          <option value="None"> </option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
      <div>
        Número de habitantes
        <select onChange={handleSortPopulation} value={filters.population}>
          <option value="None"> </option>
          <option value="bigPop">Menor a Mayor</option>
          <option value="smallPop">Mayor a Menor</option>
        </select>
      </div>
    </div>
  );
};

export default ButtonsOrder;
