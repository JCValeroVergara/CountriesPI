import style from './Card.module.css'
import { Link } from 'react-router-dom';


const Card = ({ flags, name, continent, id }) => {
  return (
    <div className={style.card}>
      <Link to={`/detail/${id}`}>
        <img className={style.img} src={flags} alt="Flag" width={250} height={150}/>
      </Link>
      <p>name: {name}</p>
      <p>Continent: {continent}</p>
    </div>
  );
};

export default Card;



