import React from 'react';
import style from './FormCreateActivities.module.css'
import  { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import validate from '../validation/validation';
import { postActivity } from '../../redux/actions';
import ok from '../../assets/success.jpg';
import load from '../../assets/loadMap.gif';
import failed from '../../assets/fail1.png';
import { useDispatch } from 'react';

const FormCreateActivities = () => {

const allCountries = useSelector((state) => state.allCountries);
const dispatch = useDispatch;
const [success, setSuccess] = useState('');
// const [fail, setFail] = useState(null);
const [country_, setCountry] = useState([]);
const [loading, setLoading] = useState(true);

  const [touch, setTouch] = useState({
    name: false,
    typeActivity:false,
    difficulty: false,
    duration: false,
    season: false,
    idPais: false,
  });
  
    const initialState=({
    name: '',
    typeActivity: '',
    duration: '',
    difficulty: '',
    season: '',
    idPais: [],
    });
     const [inputs, setInputs] = useState(initialState);
     const [selectedCountry, setSelectedCountry] = useState('');

    const [errors, setErrors] = useState({
      // name: '',
      // typeActivity: '',
      // duration: '',
      // difficulty: '',
      // season: '',
      // idPais: ,
    });
   
   
   

    useEffect(() => {
      setTimeout(() => setLoading(false), 2000);
      setCountry(allCountries);
    }, [allCountries]);

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    
    
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
      setErrors(
        validate({
          ...inputs,
          [name]: value,
        })
      );
      setTouch({
        ...touch,
        [name]: true,
      });
    };

const handleSubmit = async (event) => {
        event.preventDefault();
       console.log(errors);

   if (Object.keys(errors).length === 0 ) {
      await dispatch(postActivity(inputs));
      console.log('Agregado correctamente');
            
            setSuccess('OK');
            setTimeout(() => {
               setSuccess('');
               setInputs({
                  name: "",
                  typeActivity:'',
                  difficulty: 0,
                  duration: "",
                     season: "",
                    idPais: [],
                });
              }, 3000);
        }else {
            setSuccess('error');
            resetForm();
           setTimeout(() => {
               setSuccess('')
            },3000)
            
        }
    }
// const handleCountry = (event) => {
//      const { value } = event.target;
//      setSelectedCountry(value);
//   setInputs({
//     ...inputs,
//     idPais: [...inputs.idPais, value],
//   });
// };

   const handleCountry = (event) => {
     const { value } = event.target;

     if (!inputs.idPais.includes(value)) {
       setInputs((prevInputs) => ({
         ...prevInputs,
         idPais: [...prevInputs.idPais, value],
       }));
     }
   };
   
   const handleRemoveCountry = (id) => {
     setInputs((prevInputs) => ({
       ...prevInputs,
       idPais: prevInputs.idPais.filter((country) => country !== id),
     }));
   };
   
   

    const resetForm = () => {
      setInputs(initialState);
    };

    console.log({
      name: inputs.name,
      typeActivity: inputs.typeActivity,
      duration: inputs.duration,
      difficulty: inputs.difficulty,
      season: inputs.season,
      idPais: inputs.idPais,
    });

 return (
   <div>
     {loading ? (
       <div className={style.loading}>
         <div className={style.loadingdiv}>
           <p className={style.loadingp}>Cargando actividades...</p>
           <img className={style.animation} src={load} alt="loading" />
         </div>
       </div>
     ) : (
       <div className={style.container}>
         <div className={style.container1}>
           <h1 className={style.txt}>Registra una Actividad</h1>
           <form onSubmit={handleSubmit}>
             {success === 'OK' && (
               <p className={style.ok}>
                 <img src={ok} alt="success" />
               </p>
             )}
             {success === 'error' && (
               <p className={style.fail}>
                 <img src={failed} alt="fail" />
               </p>
             )}

             <div>
               <label htmlFor="name">Name: </label>
               <input
                 className={style.input}
                 type="text"
                 value={inputs.name}
                 onChange={handleInputChange}
                 name="name"
                 id="name"
               />
             </div>

             <div>
               <label htmlFor="typeActivity">Type Activity: </label>
               <select
                 className={style.select}
                 name="typeActivity"
                 value={inputs.typeActivity}
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
               {touch.typeActivity && errors.typeActivity && (
                 <p className={style.validate}>{errors.typeActivity}</p>
               )}
             </div>
                  
             <div>
               <label htmlFor="duration">Duration in hours: </label>
               <input
                 className={style.input2}
                 type="number"
                 min="1"
                 max="24"
                 value={inputs.duration}
                 onChange={handleInputChange}
                 name="duration"
                 id="duration"
               />
               {touch.duration && errors.duration && (
                 <p className={style.validate}>{errors.duration}</p>
               )}
             </div>

             <div>
               <label htmlFor="difficulty">Level Difficulty: </label>
               <input
                 className={style.input2}
                 type="number"
                 min="1"
                 max="5"
                 value={inputs.difficulty}
                 onChange={handleInputChange}
                 name="difficulty"
                 id="difficulty"
               />
               {touch.difficulty && errors.difficulty && (
                 <p className={style.validate}>{errors.difficulty}</p>
               )}
             </div>

             <div>
               <label htmlFor="season">Season: </label>
               <select
                 className={style.input}
                 name="season"
                 value={inputs.season}
                 onChange={handleInputChange}
               >
                 <option value="">Elige una temporada...</option>
                 <option value="Spring">Spring</option>
                 <option value="Summer">Summer</option>
                 <option value="Autumn">Autumn</option>
                 <option value="Winter">Winter</option>
               </select>
               {touch.season && errors.season && (
                 <p className={style.validate}>{errors.season}</p>
               )}
             </div>

             <div>
               <label className={style.label} htmlFor="idPais">
                 Country (es) :{' '}
               </label>
               <select
                 className={style.select}
                 name="idPais"
                 value={selectedCountry}
                 onChange={handleCountry}
                 //   multiple
               >
                 {allCountries
                   .sort((a, b) => a.name.localeCompare(b.name))
                   .map((country) => (
                     <option key={country.id} value={country.id}>
                       {country.name}
                     </option>
                   ))}
               </select>

               <ul>
                 {inputs.idPais.map((id) => {
                   const country = allCountries.find(
                     (country) => country.id === id
                   );
                   return (
                     <li key={id}>
                       {country && country.name}
                       <button onClick={() => handleRemoveCountry(id)}>
                         Remove
                       </button>
                     </li>
                   );
                 })}
               </ul>

               <input
                 className={style.input}
                 type="text"
                 name="idPais"
                 value={inputs.idPais}
                 onChange={handleInputChange}
               />

               {touch.idPais && errors.idPais && (
                 <p className={style.validate1}>{errors.idPais}</p>
               )}
             </div>

             <button type="submit">CREATE</button>
           </form>
         </div>
       </div>
     )}
   </div>
 );
  }

export default FormCreateActivities;