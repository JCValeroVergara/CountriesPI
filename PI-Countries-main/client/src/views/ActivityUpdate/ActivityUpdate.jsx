import style from './ActivityUpdate.module.css'
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCountries } from '../../redux/actions';

const ActivityUpdate = () => {

   const { countries } = useSelector((state) => state);
   const dispatch = useDispatch();

   const [formData, setFormData] = useState({
      id: '',
      name: '',
      typeActivity: '',
      difficulty: '',
      duration: '',
      season: '',
      idPais: [],
   });

   useEffect(() => {
     dispatch(getCountries());
   }, [dispatch]);

   const handleCountry = (event) => {
     const { value } = event.target;

     if (!formData.idPais.includes(value)) {
       setFormData((prevInputs) => ({
         ...prevInputs,
         idPais: [...prevInputs.idPais, value],
       }));
     }
   };

   const handleRemoveCountry = (id) => {
     setFormData((prevInputs) => ({
       ...prevInputs,
       idPais: prevInputs.idPais.filter((country) => country !== id),
     }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      const fieldsToUpdate = {
        name: formData.name,
        typeActivity: formData.typeActivity,
        difficulty: formData.difficulty,
        duration: formData.duration,
        season: formData.season,
        idPais: formData.idPais,
      };

   const confirmMessage = `Are you sure you want to update the activity with the following values?
${Object.entries(fieldsToUpdate)
  .filter(([key, value]) => value !== undefined && value !== '')
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}`;

   if (!window.confirm(confirmMessage)) {
     // El usuario canceló la actualización
     return;
   }


      try {
        const { id, name, typeActivity, difficulty, duration, season, idPais } =
          formData;

        // Crear el objeto con los campos actualizados
        const updatedFields = {
          name,
          typeActivity,
          difficulty,
          duration,
          season,
          idPais,
        };

        // Eliminar los campos con valor vacío para que no se envíen al backend
        Object.keys(updatedFields).forEach(
          (key) => updatedFields[key] === '' && delete updatedFields[key]
        );

        // Enviar la solicitud PUT al backend
        await axios.put(
          `http://localhost:3001/activities/${id}`,
          updatedFields
        );

        // Realizar alguna acción después de la actualización exitosa, como mostrar un mensaje de éxito
        alert('Activity updated successfully');
        // Restablecer el formulario a un estado vacío
        setFormData({
          id: '',
          name: '',
          typeActivity: '',
          difficulty: '',
          duration: '',
          season: '',
          idPais: [],
        });
      } catch (error) {
         // Manejar el error en caso de que ocurra
         console.error('Error updating activity:', error);
      }
   };

   const handleInputChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
   };

   return (
     <div className={style.container}>
       <div className={style.container1}>
         <h1 className={style.txt}>Update Activity</h1>
         <form onSubmit={handleSubmit}>
           <div>
             <label htmlFor="id">ID: </label>
             <input
               className={style.input}
               type="text"
               name="id"
               value={formData.id}
               onChange={handleInputChange}
               style={{ width: '10rem' }}
             />
           </div>
           <div>
             <label htmlFor="name">Name: </label>
             <input
               className={style.input}
               type="text"
               name="name"
               value={formData.name}
               onChange={handleInputChange}
               style={{ width: '30rem' }}
             />
           </div>
           <div>
             <label htmlFor="typeActivity">Type Activity: </label>
             <select
               className={style.select}
               name="typeActivity"
               value={formData.typeActivity}
               onChange={handleInputChange}
             >
               <option value="">Select a type Activity...</option>
               <option value="Outdoor">Outdoor</option>
               <option value="Adventure">Adventure</option>
               <option value="Shopping">Shopping</option>
               <option value="Cultural">Cultural</option>
               <option value="Watersports">Water sports</option>
               <option value="Winter sports">Winter sports</option>
               <option value="Entertainment">Entertainment</option>
               <option value="Gastronomy">Gastronomy</option>
               <option value="Historical">Historical</option>
               <option value="Nature">Nature</option>
             </select>
           </div>
           <div>
             <label htmlFor="difficulty">Difficulty: </label>
             <input
               className={style.input2}
               type="number"
               min="1"
               max="24"
               name="difficulty"
               value={formData.difficulty}
               onChange={handleInputChange}
             />
           </div>
           <div>
             <label htmlFor="duration">Duration: </label>
             <input
               className={style.input2}
               type="number"
               min="1"
               max="5"
               name="duration"
               value={formData.duration}
               onChange={handleInputChange}
             />
           </div>
           <div>
             <label htmlFor="season">Season: </label>
             <select
               className={style.input}
               name="season"
               value={formData.season}
               onChange={handleInputChange}
               style={{ width: '30rem' }}
             >
               <option value="">Select a Season...</option>
               <option value="Spring">Spring</option>
               <option value="Summer">Summer</option>
               <option value="Autumn">Autumn</option>
               <option value="Winter">Winter</option>
             </select>
           </div>
           <div>
             <label className={style.label} htmlFor="idPais">
               Country(es):{' '}
             </label>
             <select
               className={style.select}
               name="idPais"
               value={formData.idPais.join(',')}
               onChange={handleCountry}
             >
               {countries
                 .sort((a, b) => a.name.localeCompare(b.name)) // Ordenar los países por nombre en orden ascendente
                 .map((country) => (
                   <option key={country.id} value={country.id}>
                     {country.name}
                   </option>
                 ))}
             </select>
             <ul>
               {formData.idPais.map((id) => {
                 const country = countries.find((country) => country.id === id);
                 return (
                   <li key={id}>
                     {country && country.name}
                     <button
                       className={style.buttonDele}
                       onClick={() => handleRemoveCountry(id)}
                     >
                       ❌
                     </button>
                   </li>
                 );
               })}
             </ul>
           </div>

           <button className={style.button} type="submit">
             Update
           </button>
         </form>
       </div>
     </div>
   );
   };

   export default ActivityUpdate;