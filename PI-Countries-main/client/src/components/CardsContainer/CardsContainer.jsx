import Card from '../Card/Card';
import style from './CardsContainer.module.css'
import { useSelector } from 'react-redux';


const CardsContainer = () => {
  
  const countries = useSelector((state) => state.countries);
  
  return (
    <div className={style.container}>
    
        {countries.map(country => {
          return <Card
            key={country.id}
            id={country.id}
            flags={country.flags}
            name={country.name}
            continent={country.continent}
          />
      })}
    
    
    </div>
  );
};

export default CardsContainer;
