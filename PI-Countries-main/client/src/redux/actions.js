import axios from 'axios'
import {
   GET_COUNTRIES,
   FILTER_BY_CONTINENT,
   ORDER_COUNTRIES_ALF,
   ORDER_COUNTRIES_POP,
   GET_COUNTRY_BY_NAME,
   GET_COUNTRIES_QUERY,
   RESET_STATE,
   SET_PAGE,
   SET_ORDER,
   FILTER_BY_TYPE_ACTIVITY,
   GET_ACTIVITIES,
   CREATE_ACTIVITY,
   DELETE_ACTIVITY,
   // UPDATE_ACTIVITY,
   


   } from './actions-types';

   //PAGINADO

   export const setPage = (page) => {
   return {
      type: SET_PAGE,
      payload: page,
   }
   }




   export const setOrder = (order) => {
   return {
      type: SET_ORDER,
      payload: order,
   };
   };

   export const resetState = () => {
   return {

      type: RESET_STATE,
   }
   }


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
      payload: name
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
      payload: continent
   };
   };

   export const filterByTypeActivity = (typeActivity) => {
   return {
      type: FILTER_BY_TYPE_ACTIVITY,
      payload: typeActivity
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

   export const getActivities = () => {
      return async function (dispatch) {
            const info = await axios.get('http://localhost:3001/activities');
            const activities = info.data;
            dispatch({type: GET_ACTIVITIES, payload: activities})
      }
   }





// CREAR ACTIVIDAD

export const postActivity = (payload) => {
   const activity = {
      name: payload.name,
      typeActivity: payload.typeActivity,
      difficulty: payload.difficulty,
      duration: payload.duration,
      season: payload.season,
      idPais: payload.idPais,
   };

   return async (dispatch) => {
      try {
         const { data } = await axios.post('http://localhost:3001/activities', activity);
         return dispatch({
            type: CREATE_ACTIVITY,
            payload: data
         });
      
      } catch (error) {
         console.log(error);
      }
   };
}

// ACTUALIZAR ACTIVIDAD

// export const updateActivity = (idValue, formData) => {

//    return async (dispatch) => {
//       try {
//          await axios.put(`http://localhost:3001/activities/${idValue}`,formData);
//          return dispatch({
//          type: UPDATE_ACTIVITY,
//          payload: formData,
//          });
//       } catch (error) {
//          console.log(error);
//       }
//    };
// };

//DELETE ACTIVITY
export const deleteActivity = (id) => {
   return async function (dispatch) {
      try {
      // Envía una solicitud DELETE al servidor
      await axios.delete(`http://localhost:3001/activities/${id}`);

      // Hace el dispatch de la acción DELETE_ACTIVITY con el id de la actividad
      dispatch({ type: DELETE_ACTIVITY, payload: id });
      } catch (error) {
      // Maneja cualquier error que ocurra durante la eliminación
      console.log('Error deleting activity:', error);
      }
   };
};



//UPDATE ACTIVITY

