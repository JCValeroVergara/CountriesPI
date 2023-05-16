const { Op } = require('sequelize');
const {
  getByIdCountries,
  getCountries,
  getByNameCountries,
} = require('../controllers/countriesControllers');

const getCountriesHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const countries = name
      ? await getByNameCountries(name)
      : await getCountries();
    if (!countries.length) throw Error(`${name} no existe como País`);
    res.status(200).json(countries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getByIdCountriesHandler = async (req, res) => {
  const { idPais } = req.params;
  try {
    const country = await getByIdCountries(idPais);
    res.status(200).json(country);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCountriesHandler,

  getByIdCountriesHandler,
};
