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
const [success, setSuccess] = useState(false);
const [fail, setFail] = useState(null);
const [country, setCountry] = useState([]);
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
      name: '',
      typeActivity: '',
      duration: '',
      difficulty: '',
      season: '',
      idPais: [],
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
        try {
          await dispatch(postActivity(inputs));
          console.log('Agregado correctamente');
        } catch (error) {
          console.log('Error al agregar la actividad', error.message);
        }

        if(Object.keys(errors).length === 0 && inputs.name && inputs.difficulty && inputs.duration && inputs.idPais && inputs.season){
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
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
            setSuccess(false);
            setFail(true);
            resetForm();
            setTimeout(() => {
                setFail(null);
                
            }, 3000);
        }
    }
const handleCountry = (event) => {
     const { value } = event.target;
     setSelectedCountry(value);
  setInputs({
    ...inputs,
    idPais: [...inputs.idPais, value],
  });
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
   <div className={style.loading}>
     {loading ? (
       <div className={style.loadingdiv}>
         <p className={style.loadingp}>Cargando actividades...</p>
         <img className={style.animation} src={load} alt="loading" />
       </div>
     ) : (
       <div className={style.container}>
         <div className={style.background}>
           <h1 className={style.txt}>Registra una Actividad</h1>
           <form onSubmit={handleSubmit}>
             {success && (
               <p className={style.ok}>
                 <img src={ok} alt="success" />
               </p>
             )}
             {fail !== null && (
               <p className={style.fail}>
                 <img src={failed} alt="fail" />
               </p>
             )}

             <div>
               <label htmlFor="name">Name: </label>
               <input
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
                 className={style.input}
                 name="typeActivity"
                 value={inputs.typeActivity}
                 onChange={handleInputChange}
               >
                 <option value="">Select a type Activity...</option>
                 <option value="Al Aire Libre">Al Aire Libre</option>
                 <option value="Aventura">Aventura</option>
                 <option value="Compras">Compras</option>
                 <option value="Cultural">Cultural</option>
                 <option value="Deportes Acuáticos">Deportes Acuáticos</option>
                 <option value="Deportes de Winter">Deportes de Winter</option>
                 <option value="Entretenimiento">Entretenimiento</option>
                 <option value="Gastronomía">Gastronomía</option>
                 <option value="Histórico">Histórico</option>
                 <option value="Naturaleza">Naturaleza</option>
               </select>
               {touch.typeActivity && errors.typeActivity && (
                 <p className={style.validate}>{errors.typeActivity}</p>
               )}
             </div>

             <div>
               <label htmlFor="duration">Duration in hours: </label>
               <input
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
                 País:{' '}
               </label>
               <select
                 className={style.input}
                 name="idPais"
                 value={inputs.idPais}
                 onChange={handleCountry}
                 multiple
               >
                 {allCountries
                   .sort((a, b) => a.name.localeCompare(b.name))
                   .map((country) => (
                     <option key={country.id} value={country.id}>
                       {country.name}
                     </option>
                   ))}
               </select>
               <input
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