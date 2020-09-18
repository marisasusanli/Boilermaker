const router = require('express').Router();

// matches GET requests to /api/puppies/
router.get('/', async (req, res, next) => {
  try {
    const puppies = await Puppy.findAll();
    res.json(puppies);
  } catch (err) {
    next(err);
  }
});
// matches POST requests to /api/puppies/
router.post('/', function (req, res, next) {
  /* etc */
});
// matches PUT requests to /api/puppies/:puppyId
router.put('/:puppyId', function (req, res, next) {
  /* etc */
});
// matches DELETE requests to /api/puppies/:puppyId
router.delete('/:puppyId', function (req, res, next) {
  /* etc */
});

module.exports = router;
