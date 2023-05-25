import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteActivity } from '../../redux/actions';
import style from './ActivityDelete.module.css';

const ActivityDelete = () => {
   const dispatch = useDispatch();
   const activities = useSelector((state) => state.activities);
   const [activityId, setActivityId] = useState('');
   const [activityData, setActivityData] = useState(null);
   const [showMessage, setShowMessage] = useState(false);


   const handleChange = (event) => {
      const id = event.target.value;
      setActivityId(id);
      const activity = activities.find((activity) => activity.id === id);
      setActivityData(activity);
   }

const handleSubmit = (event) => {
   event.preventDefault();
   
   

   if (window.confirm('Are you sure you want to delete this activity?')) {
      dispatch(deleteActivity(activityId));
      setShowMessage(true)
      setActivityData(null);
      setTimeout(() => {
      setShowMessage(false);
      setActivityId('');
      setActivityData(null);
      }, 4000);
   }
};

return (
  <div className={style.container}>
    <div className={style.container1}>
      <h1 className={style.txt}>Delete Activities</h1>
      {showMessage && (
        <p className={style.dialogContent}>
          The activity with ID {activityId} was deleted successfully
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="activityId">Activity ID:</label>
        <input
          type="text"
          id="activityId"
          value={activityId}
          onChange={handleChange}
        />
        <button type="submit">Delete</button>
      </form>
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

export default ActivityDelete;
