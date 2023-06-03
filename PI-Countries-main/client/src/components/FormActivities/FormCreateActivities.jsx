import React from 'react';
import style from './FormCreateActivities.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from '../validation/validation';
import { getCountries, getActivities, postActivity } from '../../redux/actions';



const FormCreateActivities = () => {
const { countries } = useSelector((state) => state);
const dispatch = useDispatch();
const [country, setCountry] = useState([]);
const [activities] = useState([]);


useEffect(() => {
	dispatch(getCountries());
	dispatch(getActivities());
}, [dispatch]);

useEffect(() => {
	setCountry(countries);
}, [countries, country]);

useEffect(() => {
	window.scrollTo(0, 0);
}, []);





const [touch, setTouch] = useState({
	name: false,
	typeActivity: false,
	difficulty: false,
	duration: false,
	season: false,
	idPais: false,
});

const [formData, setFormData] = useState({

	name: '',
	typeActivity: '',
	duration: '',
	difficulty: '',
	season: '',
	idPais: [],
})


const [selectedCountry] = useState('');

const [errors, setErrors] = useState({
	name: '',
	typeActivity: '',
	duration: '',
	difficulty: '',
	season: '',
	idPais:[] ,
});



//Cambios en los en el form
const handleInputChange = (event) => {
	const name = event.target.name;
	const value = event.target.value;
	const existingActivity = activities.find(
		(activity) => activity.name === formData.name
	);

	if (existingActivity) {
		alert('An activity with that name already exists');
		return;
	}

	setFormData({ ...formData, [name]: value });
	setErrors(validate({ ...formData, [name]: value }));
	setTouch({...touch,[name]: true});
};




//se encarga de la seleccion de paises
const handleCountry = (event) => {
const { value } = event.target;

if (!formData.idPais.includes(value)) {
	setFormData((prevInputs) => ({
	...prevInputs,
	idPais: [...prevInputs.idPais, value],
	}));
	}
	setErrors((prevErros) => ({
		...prevErros,
		idPais:'',
	}))
};

//se encarga de eliminar de seleccion a paises que se ingresanron errados y se quiere retirar
const handleRemoveCountry = (id) => {
setFormData((prevInputs) => ({
	...prevInputs,
	idPais: prevInputs.idPais.filter((country) => country !== id),
}));
};


const handleSubmit = (event) => {
	event.preventDefault();
	dispatch(postActivity(formData));
	alert('the activity has been created successfully');

	setFormData({
	name: '',
	typeActivity: '',
	difficulty: '',
	duration: '',
	season: '',
	idPais: [],
	});
};

const disableSubmit = () => {
if (
	!formData.name||!formData.typeActivity ||!formData.difficulty ||!formData.duration ||!formData.season ||formData.idPaislength === 0)
	return false;
if (errors.name ||errors.typeActivity ||errors.difficulty ||errors.duration ||errors.season ||errors.idPais)
	return false;
return true;
};



return (
  <div className={style.container}>
    <div className={style.container1}>
      <h1 className={style.txt}>Create an Activity</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            className={style.input}
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            name="name"
            id="name"
            style={{ width: '30rem' }}
          />
          {touch.name && errors.name && (
            <p className={style.dialogContent}>{errors.name}</p>
          )}
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
          {touch.typeActivity && errors.typeActivity && (
            <p className={style.dialogContent}>{errors.typeActivity}</p>
          )}
        </div>

        <div>
          <label htmlFor="duration">Duration in hours: </label>
          <input
            className={style.input2}
            type="number"
            min="1"
            max="24"
            value={formData.duration}
            onChange={handleInputChange}
            name="duration"
            id="duration"
          />
          {touch.duration && errors.duration && (
            <p className={style.dialogContent}>{errors.duration}</p>
          )}
        </div>

        <div>
          <label htmlFor="difficulty">Level Difficulty: </label>
          <input
            className={style.input2}
            type="number"
            min="1"
            max="5"
            value={formData.difficulty}
            onChange={handleInputChange}
            name="difficulty"
            id="difficulty"
          />
          {touch.difficulty && errors.difficulty && (
            <p className={style.dialogContent}>{errors.difficulty}</p>
          )}
        </div>

        <div>
          <label htmlFor="season">Season: </label>
          <select
            className={style.input}
            name="season"
            value={formData.season}
            onChange={handleInputChange}
            style={{ width: '20rem' }}
          >
            <option value="">Select a Season...</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Autumn">Autumn</option>
            <option value="Winter">Winter</option>
          </select>
          {touch.season && errors.season && (
            <p className={style.dialogContent}>{errors.season}</p>
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
          >
            {countries
              .sort((a, b) => a.name.localeCompare(b.name))
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

          {/* <input
               className={style.input}
               type="text"
               name="idPais"
               value={formData.idPais}
               onChange={handleInputChange}
            /> */}

          {touch.idPais && errors.idPais && (
            <p className={style.dialogContent}>{errors.idPais}</p>
          )}
        </div>

        <button
          className={style.button}
          type="submit"
          disabled={!disableSubmit()}
        >
          CREATE
        </button>
      </form>
    </div>
  </div>
);
};

export default FormCreateActivities;
