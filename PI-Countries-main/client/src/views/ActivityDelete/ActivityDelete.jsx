import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteActivity, getActivities } from '../../redux/actions';
import style from './ActivityDelete.module.css';


const ActivityDelete = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  const [activityId, setActivityId] = useState('');
  const [activityData, setActivityData] = useState({});
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  const handleChange = (event) => {
    const id = parseInt(event.target.value);
    setActivityId(id);
    const activity = activities.find((activity) => activity.id === id);
    console.log(activity);
     setActivityData(activity);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (window.confirm('Are you sure you want to delete this activity?')) {
      dispatch(deleteActivity(activityId));
      setShowMessage(true);
      setActivityId('');
      setActivityData({});
      setTimeout(() => {
        setShowMessage(false);
      }, 4000);
     }
     console.log(activityData);
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
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="activityId">Activity ID:</label>
            <input
              className={style.input}
              type="text"
              id="activityId"
              value={activityId}
              onChange={handleChange}
            />
            <button className={style.button} type="submit">
              Delete
            </button>
          </form>
        </div>
        <div>
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
              {activityData && (
                <tr key={activityData.id}>
                  <td>{activityData.id}</td>
                  <td>{activityData.name}</td>
                  <td>{activityData.typeActivity}</td>
                  <td>{activityData.difficulty}</td>
                  <td>{activityData.duration}</td>
                  <td>{activityData.season}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityDelete;