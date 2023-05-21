import React from 'react';
import style from './SearchBarCountries.module.css'
import {connect} from 'react-redux'
import {  useState } from 'react';
import { getCountriesQuery } from '../../redux/actions';


function SearchBarCountriesByName({ onSearch }) {
  const [countries, setCountries] = useState('');

  const handleChange = (event) => {
    const searchValue = event.target.value;
    setCountries(searchValue);
    onSearch(searchValue); // Realizar el filtrado al momento de cambiar el valor
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(countries);
    setCountries('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={style.input}
          placeholder="Search a Country..."
          value={countries}
          onChange={handleChange}
        />
        <button type="submit"></button>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (name) => dispatch(getCountriesQuery(name)),
  };
};

export default connect(null, mapDispatchToProps)(SearchBarCountriesByName);