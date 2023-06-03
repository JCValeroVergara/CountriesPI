import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getCountries } from '../../redux/actions';



const ActivityUpdateCountry = () => {
const { countries } = useSelector((state) => state);
const dispatch = useDispatch();
const [formData, setFormData] = useState({
   id: '',
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

   try {
      const { id, idPais } = formData;
console.log('Selected country ID:', idPais);
      // Crear el objeto con los campos actualizados
      const updatedFields = {
      idPais,
      };

      // Enviar la solicitud PUT al backend
      await axios.put(`http://localhost:3001/activities/${id}`, updatedFields);

      // Realizar alguna acción después de la actualización exitosa, como mostrar un mensaje de éxito
      console.log('Activity updated successfully');
   } catch (error) {
      // Manejar el error en caso de que ocurra
      console.error('Error updating activity:', error);
   }
};

return (
  <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="id">ID: </label>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={(event) =>
            setFormData({ ...formData, id: event.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="idPais">Country(es): </label>
        <select
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
                <button onClick={() => handleRemoveCountry(id)}>Remove</button>
              </li>
            );
          })}
        </ul>
      </div>
      <button type="submit">Update</button>
    </form>
  </div>
);
};

export default ActivityUpdateCountry;