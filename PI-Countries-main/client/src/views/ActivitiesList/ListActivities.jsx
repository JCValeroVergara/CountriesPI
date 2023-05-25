import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getActivities } from '../../redux/actions';
import style from './ListActivities.module.css'

const ListActivities = () => {
   const dispatch = useDispatch();
   const activities = useSelector(state => state.activities);

   useEffect(() => {
      dispatch(getActivities());
   }, [dispatch]);

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
             </tr>
           </thead>
           <tbody>
             {activities.map((activity) => (
               <tr key={activity.id}>
                 <td>{activity.id}</td>
                 <td>{activity.name}</td>
                 <td>{activity.typeActivity}</td>
                 <td>{activity.difficulty}</td>
                 <td>{activity.duration}</td>
                 <td>{activity.season}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </div>
   );
};

export default ListActivities;
