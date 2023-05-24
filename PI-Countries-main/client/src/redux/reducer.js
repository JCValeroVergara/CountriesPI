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
     RESET_STATE,
  
 
  
} from './actions-types';


const initialState = {
     countries: [],
     allCountries: [],
     filterContinent: 'All',
     
     activities: [],
     allActivities: [],
     
     
     page: 1,

  //ESTADOS INICIALES DE ACTIVITIES
  
};





const rootReducer = (state = initialState, action) => {
   switch (action.type) {
     // RESETEA ESTADOS
      
      case RESET_STATE:
        return {
           ...state,
           countries: state.allCountries
          
         };
         



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
         return {
            ...state,
            page:action.payload,
      }

    // CASOS PARA BUSQUEDAS, FILTROS, ORDENAMIENTOS
    case FILTER_BY_CONTINENT:
      const countries = state.allCountries;
      const continentFiltered =
        action.payload === 'All'
          ? countries
          : countries.filter((elem) => elem.continent === action.payload);
      return {
        ...state,
        countries: continentFiltered,
        filterContinent: action.payload,
      };

    case FILTER_BY_TYPE_ACTIVITY:
         const { payload } = action;
         
          const filteredByType = state.countries.filter(
          (country) => {
               
             return (
               country.activities &&
               country.activities.some((activity) => {
                
                    return activity.typeActivity === payload;
               })
               );
          }
          );
        
          return {
            ...state,
            countries: filteredByType,
          };

    case ORDER_COUNTRIES_ALF:
         const countriesToSortAlf = state.countries;
         
      let orderAlf 
        if (action.payload === 'asc') {
            orderAlf = countriesToSortAlf.sort((a, b) =>
              a.name > b.name ? 1 : b.name > a.name ? -1 : 0
           );
           
         } else if (action.payload === 'desc') {
           orderAlf = countriesToSortAlf.sort((a, b) =>
             a.name > b.name ? -1 : b.name > a.name ? 1 : 0
           );
        } else if (action.payload === 'None') {
           return state
         }
        
      return {
        ...state,
        countries: orderAlf,
      };

    case ORDER_COUNTRIES_POP:
         const countriesToSortPop = state.countries;
         let orderPop 
         
         if (action.payload === 'bigPop') {
           orderPop = countriesToSortPop.sort((a, b) =>
             a.population > b.population
               ? 1
               : b.population > a.population
               ? -1
               : 0
           );
         } else if (action.payload === 'smallPop') {
           orderPop = countriesToSortPop.sort((a, b) =>
             a.population > b.population
               ? -1
               : b.population > a.population
               ? 1
               : 0
           );
         } else if (action.payload === 'None') {
           return state;
         }
      
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
