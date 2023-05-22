import React from 'react';
import style from './SearchBarCountries.module.css'
import {connect} from 'react-redux'
import {  useState } from 'react';
import { getCountriesQuery } from '../../redux/actions';


function SearchBarCountriesByName(props) {
  const { onSearch } = props;
  const [countries, setCountries] = useState('');

  const handleChange = (event) => {
    setCountries(event.target.value);
    onSearch(event.target.value); // Realizar el filtrado al momento de cambiar el valor
  };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     onSearch(countries);
//     setCountries('');
//   };

  return (
    <div>
      <form onSubmit={handleChange}>
        <input
          type="text"
          className={style.input}
          placeholder="Search a Country..."
          value={countries}
          onChange={handleChange}
        />
        
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