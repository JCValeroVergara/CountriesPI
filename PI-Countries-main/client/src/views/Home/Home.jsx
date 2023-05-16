import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCountries } from '../../redux/actions';
import CardsContainer from '../../components/CardsContainer/CardsContainer'
import SearchCountryByName from '../../components/SearchBar/SearchBarCountries';
import FilterCountries from '../../components/Filters/FiltersCountries';
import ButtonsOrder from '../../components/ButtonsOrder/ButtonsOrder';

const Home = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch])
  
  


  return (
    <>
      <h1>Es la vista de Home</h1>
      <SearchCountryByName />
      <FilterCountries/>
      <ButtonsOrder/>
      <CardsContainer />
    </>
  )
}

export default Home