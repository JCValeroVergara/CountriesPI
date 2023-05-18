import {
  GET_COUNTRIES,
  FILTER_BY_CONTINENT,
  ORDER_COUNTRIES_ALF,
  ORDER_COUNTRIES_POP,
  
  
} from './actions-types';


const initialState = {
  countries: [],
  allCountries: [],
  filterContinent: 'All',
  
};



const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    //CASOS PARA OBTENER INFORMACIÓN

    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };

  

    //CASOS PARA FILTROS, ORDENAMIENTOS, BUSQUEDAS
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

    case ORDER_COUNTRIES_ALF:
      const countriesToSortAlf =
        action.payload === 'ALL'
          ? [...state.allCountries]
          : [...state.countries];
      const orderAlf =
        action.payload === 'asc'
          ? countriesToSortAlf.sort((a, b) =>
              a.name > b.name ? 1 : b.name > a.name ? -1 : 0
            )
          : countriesToSortAlf.sort((a, b) =>
              a.name > b.name ? -1 : b.name > a.name ? 1 : 0
            );
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
              a.population > b.population
                ? 1
                : b.population > a.population
                ? -1
                : 0
            )
          : countriesToSortPop.sort((a, b) =>
              a.population > b.population
                ? -1
                : b.population > a.population
                ? 1
                : 0
            );
      return {
        ...state,
        countries: orderPop,
      };

    default:
      return { ...state };
  }
}




export default rootReducer