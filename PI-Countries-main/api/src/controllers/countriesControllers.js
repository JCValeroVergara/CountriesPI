const { Activity, Country } = require('../db');
const { Op } = require('sequelize');

const getCountries = async () => {
     const countries = await Country.findAll({
       include: [
         {
           model: Activity,
           attributes: [
             'id',
             'name',
             'typeActivity',
             'difficulty',
             'duration',
             'season',
           ],
           through: { attributes: [] },
         },
       ],
     });
  return countries;
};

const getByIdCountries = async (idPais) => {
  const country = await Country.findByPk(idPais, {
    include: [
      {
        model: Activity,
        attributes: ['name','typeActivity', 'difficulty', 'duration', 'season'],
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
        attributes: ['name','typeActivity', 'difficulty', 'duration', 'season'],
        through: { attributes: [] },
      },
    ],
  });
  return countries;
};

module.exports = { getByIdCountries, getByNameCountries, getCountries };
