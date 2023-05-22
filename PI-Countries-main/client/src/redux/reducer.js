import {
     GET_COUNTRIES,
     FILTER_BY_CONTINENT,
     FILTER_BY_TYPE_ACTIVITY,
     ORDER_COUNTRIES_ALF,
     ORDER_COUNTRIES_POP,
     GET_COUNTRIES_QUERY,
     SET_PAGE,
     SET_COUNTRIES_PER_PAGE,
     GET_ACTIVITIES,
     CREATE_ACTIVITY,
  
 
  
} from './actions-types';


const initialState = {
     countries: [],
     allCountries: [],
     filterContinent: 'All',
     search: '',
     selectedCountry: null,
     currentPage: 1,
     countriesPerPage: 10,
     activities: [],
     allActivities: [],
     filterActivity: 'ALL',
     filtered: []

  //ESTADOS INICIALES DE ACTIVITIES
  
};



const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // CASOS PARA OBTENER INFORMACIÓN
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
        };
     case GET_COUNTRIES_QUERY:
        return {
           ...state,
           countries: action.payload
        }

    // CASOS PAGINADO
    case SET_PAGE:
      console.log('SET_PAGE action', action.payload);
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_COUNTRIES_PER_PAGE:
      return {
        ...state,
        countriesPerPage: action.payload,
      };

    // CASOS PARA BUSQUEDAS, FILTROS, ORDENAMIENTOS
    case FILTER_BY_CONTINENT:
      const allCountries = state.allCountries;
      const continentFiltered =
        action.payload === 'All'
          ? allCountries
          : allCountries.filter((elem) => elem.continent === action.payload);
      return {
        ...state,
        countries: continentFiltered,
        filterContinent: action.payload,
      };

    case FILTER_BY_TYPE_ACTIVITY:
          const { payload: typeActivity } = action;
          console.log('Type activity:', typeActivity); // Verificar el valor de typeActivity
          const filteredByType = state.allCountries.filter(
          (country) => {
               
               console.log('Country activities:', country.activities); // Verificar las activities del país
               return (
               country.activities &&
               country.activities.some((activity) => {
                    console.log('Activity type:', activity.typeActivity); // Verificar el tipo de actividad
                    return activity.typeActivity === typeActivity;
               })
               );
          }
          );
          console.log('Filtered countries:', filteredByType); // Verificar los países filtrados
          return {
          ...state,
          filtered: filteredByType,
          order: 'typeActivity',
          };

    case ORDER_COUNTRIES_ALF:
      const countriesToSortAlf =
        action.payload === 'ALL'
          ? [...state.allCountries]
          : [...state.countries];
      const orderAlf =
        action.payload === 'asc'
          ? countriesToSortAlf.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0 )
          : countriesToSortAlf.sort((a, b) => a.name > b.name ? -1 : b.name > a.name ? 1 : 0);
      return {
        ...state,
        countries: orderAlf,
      };

    case ORDER_COUNTRIES_POP:
      const countriesToSortPop =
        action.payload === 'ALL'
          ? [...state.allCountries]
          : [...state.countries];
      const orderPop =
        action.payload === 'bigPop'
                ? countriesToSortPop.sort((a, b) =>
                  a.population > b.population ? 1
                : b.population > a.population? -1: 0
            )
          : countriesToSortPop.sort((a, b) =>
              a.population > b.population? -1
            : b.population > a.population ? 1: 0
            );
      return {
        ...state,
        countries: orderPop,
      };

    //BOTONES

    // CASOS DE ACTIVITIES
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
        allActivities: action.payload,
      };

    case CREATE_ACTIVITY:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default rootReducer;
