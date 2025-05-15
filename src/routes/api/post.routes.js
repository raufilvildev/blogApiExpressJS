const router = require('express').Router();

const { getAll, getByAuthorId, create } = require('../../controllers/post.controller');
const { checkAuthorExists } = require('../../middlewares/author.middleware');
const { checkInsert } = require('../../middlewares/post.middleware');

router.get('', getAll);
router.get('/:author_id', checkAuthorExists, getByAuthorId);
router.post('', checkInsert, create);

module.exports = router;