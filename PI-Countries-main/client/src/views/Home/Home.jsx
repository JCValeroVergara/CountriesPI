import style from './Home.module.css'
import CardsContainer from '../../components/CardsContainer/CardsContainer'
import SearchCountryByName from '../../components/SearchBar/SearchBarCountries';
import FilterCountries from '../../components/Filters/FiltersCountries';
import ButtonsOrder from '../../components/ButtonsOrder/ButtonsOrder';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getCountries,getActivities,getCountriesQuery } from '../../redux/actions';



const Home = (props) => {
  
  const dispatch = useDispatch()

  useEffect(() => {
  dispatch(getCountries())
  },[dispatch])

  useEffect(() => {
  dispatch(getActivities())
  }, [dispatch])
    
     
     
  
    return (
      <div className={style.home}>
        <h1>Es la vista de Home</h1>
        <div>
          <SearchCountryByName onSearch={getCountriesQuery} />
          <FilterCountries />
          <ButtonsOrder />
        </div>
        <br />
        <div>
          <CardsContainer />
        </div>
      </div>
    );
  };

export default Home;