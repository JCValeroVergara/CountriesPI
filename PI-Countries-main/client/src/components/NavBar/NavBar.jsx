import { Link } from "react-router-dom"
import style from "./NavBar.module.css"

const NavBar = () => {
return (
   <div className={style.mainContainer}>
      <Link to="/home">HOME</Link>
      <Link to="/create"> CREATE ACTIVITY</Link>
      <Link to="/list">ACTIVITIES LIST</Link>
      <Link to="/update">ACTIVITIES UPDATE</Link>
      <Link to="/delete">ACTIVITY DELETE</Link>
      <Link to="/about">ABOUT</Link>
      <Link to="/">LOGOUT</Link>
   </div>
);
}

export default NavBar;