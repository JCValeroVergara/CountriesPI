import style from './Home.module.css'
import CardsContainer from '../../components/CardsContainer/CardsContainer'
import SearchCountryByName from '../../components/SearchBar/SearchBarCountries';
import FilterCountries from '../../components/Filters/FiltersCountries';
import ButtonsOrder from '../../components/ButtonsOrder/ButtonsOrder';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getCountries } from '../../redux/actions';



const Home = () => {
  const dispatch = useDispatch()

  const globalState = useSelector(state => state)
  console.log(globalState)
  
  useEffect(() => {
  dispatch(getCountries())
},[dispatch])

  
    return (
      <div className={style.home}>
        <h1>Es la vista de Home</h1>
       
        <SearchCountryByName />
        <FilterCountries />
        <ButtonsOrder />
        <CardsContainer />
        

      </div>
    );
  };

export default Home;