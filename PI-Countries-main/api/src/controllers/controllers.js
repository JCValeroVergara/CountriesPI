// const express = require('express');
const axios = require('axios');
const { Country } = require('../db');
require('dotenv').config();
const { URL_API } = process.env;

const getApiData = async () => {
  try {
    const response = await axios.get(`${URL_API}`);
    const countries = response.data.map((country) => ({
      id: country.cca3,
      name: country.name.common,
      flags: country.flags.png,
      continent: country.continents.join(''),
      subregion: country.subregion,
      capital: Array.isArray(country.capital)
        ? country.capital.join(', ')
        : null,
      area: country.area,
      population: country.population,
    }));

    return countries;
  } catch (error) {
    return { error: error.message };
  }
};

const saveApiData = async () => {
  try {
    const allCountries = await getApiData();
    await Country.bulkCreate(allCountries);

    return allCountries;
  } catch (error) {
    return { error: error.message };
  }
};



module.exports = {
  saveApiData,

};
