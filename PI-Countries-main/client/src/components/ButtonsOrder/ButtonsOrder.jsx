import React from 'react';
import style from './ButtonsOrder.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { orderByName, orderByPopulation } from '../../redux/actions';

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
    <div className={style.container}>
      <div>
        <select
          className={style.select}
          onChange={handleSort}
          value={filters.name}
        >
          <option value="None">Alphabetical Order </option>
         <option value="asc">A-Z</option>
      	<option value="desc">Z-A</option>
      </select>
      </div>
      <div>
        <select
          className={style.select}
          onChange={handleSortPopulation}
          value={filters.population}
        >
          <option value="None">by Population </option>
          <option value="bigPop">Minor to Major</option>
          <option value="smallPop">Major to Minor</option>
        </select>
      </div>
    </div>
  );
};

export default ButtonsOrder;
