import style from './Home.module.css'
import CardsContainer from '../../components/CardsContainer/CardsContainer'
import SearchCountryByName from '../../components/SearchBar/SearchBarCountries';
import FilterCountries from '../../components/Filters/FiltersCountries';
// import ButtonsOrder from '../../components/ButtonsOrder/ButtonsOrder';
import { useEffect, useState } from 'react';
import { useDispatch, } from 'react-redux';
import { getCountries,getActivities,getCountriesQuery } from '../../redux/actions';



const Home = () => {

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getCountries())
      dispatch(getActivities())
   },[dispatch])


      
      const [currentPage, setCurrentPage] = useState(1);// estado del paginado
      

      return (
      <div className={style.home}>
         <div className={style.header}>
            <div className={style.block}>
            <h1>let's explore...!</h1>
            </div>
            <div className={style.block}>
            <SearchCountryByName onSearch={getCountriesQuery} />
            </div>
            <div className={style.block}>
            <FilterCountries setCurrentPage={setCurrentPage} />
            </div>
            
         </div>
         <div className={style.cardsContainer}>
            <CardsContainer
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            />
         </div>
      </div>
      );
   };

export default Home;