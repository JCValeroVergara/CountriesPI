
import { Link } from 'react-router-dom';


const Card = ({ flags, name, continent, id }) => {
  return (
    <div>
      <Link to={`/detail/${id}`}>
        <img src={flags} alt="Flag" />
      </Link>
      <p>name: {name}</p>
      <p>Continent: {continent}</p>
    </div>
  );
};

export default Card;

