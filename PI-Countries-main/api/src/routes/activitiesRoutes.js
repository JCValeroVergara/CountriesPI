const { Router } = require('express');
const {
  createActivityHandler,
  getActivityHandler,
  deleteActivityByIdHandler,
  updateActivityHandler,
  deleteCountryFromActivityHandler,
} = require('../handlers/activitiesHandlers');


const router = Router();



router.get('/', getActivityHandler);
router.post('/', createActivityHandler);
router.put('/:id', updateActivityHandler);
router.delete('/:id', deleteActivityByIdHandler);
router.delete('/:id/countries/:idPais', deleteCountryFromActivityHandler);


module.exports = router;
