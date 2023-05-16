import {
  GET_COUNTRIES,
  FILTER_BY_CONTINENT,
  ORDER_COUNTRIES_ALF,
  ORDER_COUNTRIES_POP,
} from './actions-types';


const initialState = {
  countries: [],
  allCountries: [],
  filterActivity: 'All',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };
    
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
      const countriesToSort = state.filterContinent !== 'All' ? state.countries : state.allCountries;

      const orderAlf =action.payload === 'asc'
          ? countriesToSort.sort((a, b) =>a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
          : countriesToSort.sort((a, b) =>a.name > b.name ? -1 : b.name > a.name ? 1 : 0);

      return {
        ...state,
        countries: orderAlf,
      };
      
    case ORDER_COUNTRIES_POP:
      const countriesToSortPop =
        state.filterContinent !== 'All' ? state.countries : state.allCountries;
      const orderPop = action.payload === 'asc'
        ? countriesToSortPop.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
        : countriesToSortPop.sort((a, b) => a.name > b.name ? -1 : b.name > a.name ? 1 : 0);

      return {
        ...state,
        countries: orderPop,
      };
    default:
      return { ...state };

  }
}




export default rootReducer