const { Router } = require('express');
const countryRoutes = require('./countriesRouter');
const activityRoutes = require('./activitiesRoutes');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
mainRouter.use('/countries', countryRoutes);
mainRouter.use('/activities', activityRoutes);

module.exports = mainRouter;
