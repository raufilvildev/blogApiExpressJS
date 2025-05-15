const { getAll, create } = require('../../controllers/author.controller');
const { checkInsert } = require('../../middlewares/author.middleware');

const router = require('express').Router();

router.get('', getAll);
router.post('', checkInsert, create);

module.exports = router;