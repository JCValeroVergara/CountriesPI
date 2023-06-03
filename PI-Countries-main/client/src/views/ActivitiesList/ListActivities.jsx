import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getActivities } from '../../redux/actions';
import { Link } from 'react-router-dom';
import style from './ListActivities.module.css'

const ListActivities = () => {
   const dispatch = useDispatch();
   const activities = useSelector(state => state.activities);

   useEffect(() => {
      dispatch(getActivities());
   }, [dispatch]);

console.log(activities);
   

   return (
      <div className={style.container}>
         <div className={style.container1}>
         <h1 className={style.txt}>List of Existing Activities</h1>
         <table>
            <thead>
               <tr>
               <th>ID</th>
               <th>Name</th>
               <th>Type Activity</th>
               <th>Difficulty</th>
               <th>Duration</th>
               <th>Season</th>
               <th>Countries</th>
               </tr>
            </thead>
            <tbody>
               {activities
               .sort((a, b) => a.id - b.id) // Ordena los elementos por el ID de menor a mayor
               .map((activity) => (
                  <tr key={activity.id}>
                     <td>{activity.id}</td>
                     <td style={{ width: '15rem' }}>{activity.name}</td>
                     <td>{activity.typeActivity}</td>
                     <td>{activity.difficulty}</td>
                     <td>{activity.duration}</td>
                     <td>{activity.season}</td>
                     <td className={style.flagContainer}>
                     {activity.countries.map((country) => (
                        <Link to={`/detail/${country.id}`} key={country.id}>
                           <img
                           src={country.flags}
                           alt={country.name}
                           style={{ width: '30px', height: '18px' }}
                           className={style.img}
                           />
                        </Link>
                     ))}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         </div>
      </div>
   );
};

export default ListActivities;
