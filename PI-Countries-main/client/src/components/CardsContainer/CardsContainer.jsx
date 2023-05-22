import React, { useEffect } from 'react';
import Card from '../Card/Card';
import style from './CardsContainer.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getCountries} from '../../redux/actions';


const CardsContainer = () => {
  const state = useSelector((state) => state.countries);
  const dispatch = useDispatch();
  

  useEffect(() => {
  dispatch(getCountries())
},[dispatch])

  let filteredCountries = state;
  console.log(filteredCountries)

  if (state.filterContinent !== 'All') {
    filteredCountries = filteredCountries.filter(
      (country) => country.continent === state.filterContinent
    );
  }

 
  return (
    <div className={style.container}>
      {state.map((country) => (
        <Card
          key={country.id}
          id={country.id}
          flags={country.flags}
          name={country.name}
          continent={country.continent}
          
        />
      ))}
      <br />
    </div>
  );
};

export default CardsContainer;