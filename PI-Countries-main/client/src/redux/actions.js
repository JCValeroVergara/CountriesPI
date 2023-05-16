import axios from 'axios'
import {
  GET_COUNTRIES,
  FILTER_BY_CONTINENT,
  ORDER_COUNTRIES_ALF,
  ORDER_COUNTRIES_POP
} from './actions-types';

// ACTION COUNTRIES
export const getCountries = () => {
  return async function (dispatch) {
    const info = await axios.get(
      'http://localhost:3001/countries'
    );
    const countries = info.data;
    dispatch({type: GET_COUNTRIES,payload: countries  })
    
  };
};

//FILTER'S

export const filterByContinent = (continent) => {
  return {
    type: FILTER_BY_CONTINENT,
    payload: continent,
  };
};


//ORDER'S

export const orderByName = (payload) => {
  return {
    type: ORDER_COUNTRIES_ALF,
    payload,
  };
};

export const orderByPopulation = (payload) => {
  return {
    type: ORDER_COUNTRIES_POP,
    payload,
  };
};





//ACTION ACTIVITIES