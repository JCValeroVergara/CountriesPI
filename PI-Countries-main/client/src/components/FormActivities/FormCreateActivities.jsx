import React from 'react';
import axios from 'axios';
import { useState} from 'react';

const FormCreateActivities = () => {
  // Define los estados locales para los valores del formulario
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [duration, setDuration] = useState('');
  const [season, setSeason] = useState('');
  const [idPais, setIdPaises] = useState([]);

  // Define una función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form Values:', {
      name,
      difficulty,
      duration,
      season,
      idPais,
    });

    // Ejecuta la función Handler con los valores del formulario
    try {

      const difficultyInt = parseInt(difficulty);
      const durationInt = parseInt(duration);

      await axios.post('http://localhost:3001/activities', {
        name,
        difficulty:difficultyInt,
        duration:durationInt,
        season,
        idPais,
      });
      // Si el proceso es exitoso, puedes realizar alguna acción, como mostrar un mensaje de éxito o redirigir al usuario a otra página.
    } catch (error) {
      // Si ocurre un error, puedes mostrar un mensaje de error o realizar alguna otra acción apropiada.
    }
  };

  const addCountry = (newCountry) => {
    if (idPais.length < 20) {
      setIdPaises([...idPais, newCountry]);
    }
  };

  return (
    <div>
      <h1>Create Activity</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Difficulty:
          <input
            type="text"
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
          />
        </label>
        <br />
        <label>
          Duration:
          <input
            type="text"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
          />
        </label>
        <br />
        <label>
          Season:
          <input
            type="text"
            value={season}
            onChange={(event) => setSeason(event.target.value)}
          />
        </label>
        <br />
        <label>
          Country IDs:
          {idPais.map((country, index) => (
            <input
              key={index}
              type="text"
              value={country}
              onChange={(event) => {
                const updatedCountries = [...idPais];
                updatedCountries[index] = event.target.value;
                setIdPaises(updatedCountries);
              }}
            />
          ))}
          {idPais.length < 20 && (
            <button type="button" onClick={() => addCountry('')}>
              Add Country
            </button>
          )}
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default FormCreateActivities;
