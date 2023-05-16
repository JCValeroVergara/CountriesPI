const { Activity, Country } = require('../db');
const { Op } = require('sequelize');

const getCountries = async () => {
  const countries = await Country.findAll();
  return countries;
};

const getByIdCountries = async (idPais) => {
  const country = await Country.findByPk(idPais, {
    include: [
      {
        model: Activity,
        attributes: ['name', 'difficulty', 'duration', 'season'],
        through: { attributes: [] },
      },
    ],
  });
  return country;
};

const getByNameCountries = async (name) => {
  const countries = await Country.findAll({
    where: {
      name: { [Op.iLike]: `%${name}%` },
    },
    include: [
      {
        model: Activity,
        attributes: ['name', 'difficulty', 'duration', 'season'],
        through: { attributes: [] },
      },
    ],
  });
  return countries;
};

module.exports = { getByIdCountries, getByNameCountries, getCountries };
