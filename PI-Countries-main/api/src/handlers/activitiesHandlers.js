const {
  createActivity,
  searchActivities,
  getByNameActivity,
  deleteActivityById,
  updateActivity,
  addPaisToActivity,
  deleteCountryFromActivity,
} = require('../controllers/activitiesControllers');

const createActivityHandler = async (req, res) => {
  try {
    const { name, difficulty, duration, season, idPais } = req.body;
    const newActivity = await createActivity(
      name,
      difficulty,
      duration,
      season,
      idPais
    );
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getActivityHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const activities = name? await getByNameActivity(name): await searchActivities();
    if (!activities.length) throw Error(`${name} no existe como actividad`);
    res.status(200).json(activities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateActivityHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, difficulty, duration, season, idPais } = req.body;

    // Crear un objeto con los campos actualizados que se proporcionaron
    const updatedFields = { name, difficulty, duration, season };

    // Eliminar los campos con valor "undefined" para que no se actualicen en la base de datos
    Object.keys(updatedFields).forEach(
      (key) => updatedFields[key] === undefined && delete updatedFields[key]
    );

    // Actualizar la actividad
    await updateActivity(id, updatedFields);

    if (idPais) {await addPaisToActivity(id, idPais)}
    res.status(201).json({ message: `Activity with id ${id} updated successfully` });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteActivityByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteActivityById(id);
    res
      .status(201)
      .json({ message: `Activity with id ${id} deleted successfully` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCountryFromActivityHandler = async (req, res) => {
  try {
    const { id, idPais } = req.params;
    await deleteCountryFromActivity(id, idPais); // Incluye el idPais que deseas eliminar
    res
      .status(201)
      .json({
        message: `Country with id ${idPais} removed from activity with id ${id}`,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createActivityHandler,
  getActivityHandler,
  deleteActivityByIdHandler,
  updateActivityHandler,
  deleteCountryFromActivityHandler,
};
