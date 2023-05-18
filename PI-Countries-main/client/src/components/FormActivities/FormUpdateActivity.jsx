import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const FormUpdateActivity = () => {
  const [idValue, setIdValue] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    
  });
  

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  

const cleanData = (data) => {
  const cleanedData = {};

  for (let key in data) {
    const value = data[key];

    if (
      value !== undefined &&
      value !== '' &&
      (typeof value !== 'number' || !isNaN(value)) 
      
    ) {
      cleanedData[key] = value;
    }
  }

  return cleanedData;
};


  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, difficulty, duration, season, idPais } = formData;
    const id = parseInt(idValue, 10);
    if (isNaN(id)) {
      // Manejo del error, por ejemplo, mostrar un mensaje de error o realizar una acción apropiada
      return;
    }

    const updatedData = {
      id,
      difficulty: parseInt(difficulty),
      duration: parseInt(duration),
      name,
      season,
      
    };

    if (name) {
      updatedData.name = name;
    }
    if (season) {
      updatedData.season = season;
    }
    
    const cleanedData = cleanData(updatedData);

    try {
      const url = `http://localhost:3001/activities/${id}`;

      console.log(cleanedData);

      await axios.put(url, cleanedData);
      // Si el proceso es exitoso, puedes realizar alguna acción, como mostrar un mensaje de éxito o redirigir al usuario a otra página.
    } catch (error) {
      // Si ocurre un error, puedes mostrar un mensaje de error o realizar alguna otra acción apropiada.
    }
  };
 

  return (
    <div>
      <h1>Actualización de Actividades</h1>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input
            type="text"
            value={idValue}
            onChange={(event) => setIdValue(event.target.value)}
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Difficulty:
          <input
            type="number"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Duration:
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Season:
          <input
            type="text"
            name="season"
            value={formData.season}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default FormUpdateActivity;