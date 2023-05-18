import React from 'react';
import style from './SearchBarCountries.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

function SearchBarCountriesByName() {
  const [countries, setcountries] = useState([]);
  const [search, setSearch] = useState(''); // solo se usa en el filtro
  const [selectedCountry, setSelectedCountry] = useState(null);// se usa en la seleccion


  //funcion para traer los datos de db
  
  const showData = async () => {
    const URL = await axios.get(
      'http://localhost:3001/countries')
      const response = await fetch(URL);
    const data = await response;
    console.log(data);
    setcountries(data);
  };

  // función de busqueda
  const searcher = (event) => {
    setSearch(event.target.value);
    setSelectedCountry(null);
    console.log(event.target.value);
  };

  //metodo de filtrado
  const results = !search
    ? countries
    : countries.filter((country) =>
      country.name.toLowerCase().includes(search.toLowerCase())
    );

  useEffect(() => {
    showData();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setSearch(selectedCountry.name);
    }
  }, [selectedCountry]);

  return (
    <div className="container-fluid">
      <h2>busqueda por nombre:</h2>

      <input
        type="text"
        placeholder="Search"
        onChange={searcher}
        value={search}
       
      />

      {search &&
        results.map((country) => (
          <div
            key={country.id}
            className={`${style.result} ${
              selectedCountry && selectedCountry.id === country.id
                ? style.selected
                : ''
            }`}
            onClick={() => setSelectedCountry(country)}
          >
            {country.name}
          </div>
        ))}
    </div>
  );
}


export default SearchBarCountriesByName;