const router = require('express').Router();

const { getAll, create, getByAuthorId } = require('../../controllers/post.controller');

router.get('', getAll);
router.get('/:author_id', getByAuthorId);
router.post('', create);

module.exports = router;