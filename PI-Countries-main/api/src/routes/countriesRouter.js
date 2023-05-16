const { Router } = require('express');
const {
  getCountriesHandler,
  getByIdCountriesHandler,
} = require('../handlers/countriesHandlers');

const router = Router();

router.get('/', getCountriesHandler);
router.get('/:idPais', getByIdCountriesHandler);

module.exports = router;
