import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CountryDetail = () => {
  const { id } = useParams();
  const [country, setCountry] = useState({});
  const [ setActivities] = useState([]);

  useEffect(() => {
    axios(`http://localhost:3001/countries/${id}`)
      .then((response) => response.data)
      .then((data) => {
        if (data.name) {
          setCountry(data);
        } else {
          window.alert('There is no country with that ID');
        }
      })
      .catch((error) => {
        console.error('Error fetching country:', error);
      });
    
     axios(`http://localhost:3001/countries/${id}/activities`)
       .then((response) => response.data)
       .then((data) => {
         setActivities(data);
         
       })
       .catch((error) => {
         console.error('Error fetching activities:', error);
       });

    
    return setCountry({})
  }, [id, setActivities]);

  return (
    <div>
      <h1>More information about the Country</h1>
      {country && (
        <div>
          <img src={country.flags} alt="Could not load" />
          <h2>{country.name}</h2>
          <h4>{country.id}</h4>
          <h4>{country.continent}</h4>
          <h4>Sub Región: {country.subregion}</h4>
          <h4>Capital: {country.capital}</h4>
          <h4>Área: {country.area}</h4>
          <h4>Población: {country.population} habitantes</h4>
        </div>
      )}
      <div>
        <h3>Actividades para realizar en el país</h3>
        {country.activities && country.activities.length ? (
          country.activities.map((activity) => (
            <div key={activity.name}>
              <h4>{activity.name}</h4>
              <p>Type Activity: {activity.typeActivity}</p>
              <p>Difficulty: {activity.difficulty}</p>
              <p>Duration: {activity.duration}</p>
              <p>Season: {activity.season}</p>
            </div>
          ))
        ) : (
          <p>No existen actividades para este país</p>
        )}
      </div>
    </div>
  );
};

export default CountryDetail;






