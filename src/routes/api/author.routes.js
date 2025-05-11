const { getAll, create } = require('../../controllers/author.controller');

const router = require('express').Router();

router.get('', getAll);
router.post('', create);

module.exports = router;