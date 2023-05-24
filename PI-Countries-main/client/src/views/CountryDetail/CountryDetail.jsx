import style from './CountryDetail.module.css'
import  React,{ useEffect, useState } from 'react';
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
    
        
    return setCountry({})
  }, [id, setActivities]);

   return (
      <div className={style.container}>
               <div className={style.container1}>
           <h1>More information about the Country</h1>
        
             {country && (
       
                 <img
                   className={style.img}
                   src={country.flags}
                   alt="Could not load"
                 />
              
             )}
          <br />
        
             {country && (
               <div className={style.textOverlay }>
                 <h2>{country.name}</h2>
                 <h4>{country.id}</h4>
                 <h4>{country.continent}</h4>
                 <h4>Subregion: {country.subregion}</h4>
                 <h4>Capital: {country.capital}</h4>
                 <h4>Area: {country.area}</h4>
                 <h4>Population: {country.population} of people</h4>
               </div>
             )}
           
           <h3>Activities you could do in the Country</h3>
           {country && country.activities && country.activities.length ? (
             <table>
               <thead>
                 <tr>
                   <th>Name</th>
                   <th>Type Activity</th>
                   <th>Difficulty</th>
                   <th>Duration</th>
                   <th>Season</th>
                 </tr>
               </thead>
               <tbody>
                 {country.activities
                   .sort((a, b) => a.name.localeCompare(b.name))
                   .map((activity) => (
                     <tr key={activity.name}>
                       <td>{activity.name}</td>
                       <td>{activity.typeActivity}</td>
                       <td>{activity.difficulty}</td>
                       <td>{activity.duration}</td>
                       <td>{activity.season}</td>
                     </tr>
                   ))}
               </tbody>
             </table>
           ) : (
             <p>There are no activities for this country</p>
           )}
       </div>
      </div>
      

   );
};

export default CountryDetail;






