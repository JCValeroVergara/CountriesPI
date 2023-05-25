import style from './Landing.module.css'
import { Link } from 'react-router-dom'


const Landing = () => {
return (
   <div className={style.container}>
   <div className={style.animation}>
      <h2 className={style.title}>
         Welcome to the flight!
         <br />
         <br />
         <br />
         <br />
         the journey begins....
      </h2>
   </div>
   <Link className={style.homeButton} to="/home">
      Explore
   </Link>
   </div>
);
};

export default Landing;
