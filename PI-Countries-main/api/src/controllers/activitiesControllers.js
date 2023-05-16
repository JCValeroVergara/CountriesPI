const { Activity, Country } = require('../db');
const { Op } = require('sequelize');

const searchActivities = async () => {
  const activities = await Activity.findAll();
  return activities;
};

const createActivity = async (name, difficulty, duration, season, idPais) => {
  // Creamos la actividad turística en la base de datos
  const activity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
  });
  activity.addCountries(idPais);
  return activity;
};

const getByNameActivity = async (name) => {
  const activity = await Activity.findAll({
    where: {
      name: { [Op.iLike]: `%${name}%` } },
    include: [
      {
        model: Country,
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    ],
  });
  return activity;
};

const updateActivity = async (id, updatedFields) => {
  const activity = await Activity.findByPk(id);
  activity.set(updatedFields);
  await activity.save();
  return null;
};

const addPaisToActivity = async (id, idPais) => {
  const activity = await Activity.findByPk(id);
  await activity.addCountry(idPais);
  return null;
};

const deleteActivityById = async (id) => {
  const activity = await Activity.findByPk(id);
  await activity.destroy();
  return null;
};

const deleteCountryFromActivity = async (activityId, countryId) => {
  const activity = await Activity.findByPk(activityId);
  const country = await Country.findByPk(countryId);
  await activity.removeCountry(country);
  return null;
};

module.exports = {
  createActivity,
  searchActivities,
  getByNameActivity,
  updateActivity,
  deleteActivityById,
  addPaisToActivity,
  deleteCountryFromActivity,
};
