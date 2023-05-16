const { Router } = require('express');
const {
  createActivityHandler,
  getActivityHandler,
  deleteActivityByIdHandler,
  updateActivityHandler,
  deleteCountryFromActivityHandler,
} = require('../handlers/activitiesHandlers');

const router = Router();

const validate = (req, res, next) => {
  const { name, difficulty, duration, season } = req.body;
  if (!name)return res.status(400).json({ error: 'Missing name, obligatory field' });
  if (!difficulty)return res.status(400).json({ error: 'Missing difficulty, obligatory field' });
  if (![1, 2, 3, 4, 5].includes(difficulty)) return res.status(400)
    .json({ error: 'Invalid difficulty value, must be 1, 2, 3, 4 or 5' });
  if (!duration)return res.status(400).json({ error: 'Missing duration, obligatory field' });
  if (!season)return res.status(400).json({ error: 'Missing season, obligatory field' });

  next();
};

router.get('/', getActivityHandler);
router.post('/', validate, createActivityHandler);
router.put('/:id', updateActivityHandler);
router.delete('/:id', deleteActivityByIdHandler);
router.delete('/:id/countries/:idPais', deleteCountryFromActivityHandler);


module.exports = router;
