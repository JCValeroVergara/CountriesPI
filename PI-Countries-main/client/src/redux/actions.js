import axios from 'axios'
import {
  GET_COUNTRIES,
  FILTER_BY_CONTINENT,
  ORDER_COUNTRIES_ALF,
  ORDER_COUNTRIES_POP,
  GET_COUNTRY_BY_NAME,
  GET_COUNTRIES_QUERY,
  SET_PAGE,
  SET_COUNTRIES_PER_PAGE,
  SET_ORDER,
  // UPDATE_ACTIVITY,
  // CREATE_ACTIVITY,
  // RESET_FORM,
 
} from './actions-types';

//PAGINADO

export const setPage = (pageNumber) => {
  console.log('setPage action', pageNumber); 
  return {
    type: SET_PAGE,
    payload: pageNumber,
  };
};

export const setCountriesPerPage = (perPage) => {
  console.log('setCountriesPerPage action', perPage);
  return {
    type: SET_COUNTRIES_PER_PAGE,
    payload: perPage,
  };
};

export const setOrder = (order) => {
  return {
    type: SET_ORDER,
    payload: order,
  };
};

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



//SEARCH'S
 export const getCountryByName = (name) => {
   return {
     type: GET_COUNTRY_BY_NAME,
     payload: name,
   };
 };

 export const getCountriesQuery = (name) => {
   return async function (dispatch) {
     try {
       let info = await axios.get(
         'http://localhost:3001/countries?name=' +
           name.charAt(0).toUpperCase() +
           name.slice(1)
       );
       return dispatch({
         type: GET_COUNTRIES_QUERY,
         payload: info.data,
       });
     } catch (error) {
       return { error: error.message };
     }
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
    payload: payload
    
  };
};



export const orderByPopulation = (payload) => {
  return {
    type: ORDER_COUNTRIES_POP,
    payload,
  };
};






//ACTION ACTIVITIES




// CREAR ACTIVIDAD

export const postActivity = (payload) => {
  const activity = {
     name: payload.name,
     typeActivity:payload.typeActivity,
     difficulty: payload.difficulty,
     duration: payload.duration,
     season: payload.season,
     countries: payload.countries,
  };

  try {
    return (async function () {
      await axios.post('http://localhost:3001/activities', activity);
    })();
  } catch (error) {
    console.log(error);
  }
};



//UPDATE ACTIVITY

