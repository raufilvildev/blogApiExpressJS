const { selectAll, insert, selectByAuthorId } = require("../models/post.model");

const getAll = async (req, res) => {
    result = await selectAll(req.query.groupedByAuthor);
    res.json(result);
}

const getByAuthorId = async (req, res) => {
    result = await selectByAuthorId(req.params.author_id);
    if (result.error) {
        return res.status(400).json(result);
    }
    res.json(result);
}

const create = async (req, res) => {
    result = await insert(req.body);
    if (result.error) {
        return res.status(400).json(result);
    }
    res.json(result);
}
module.exports = { getAll, create, getByAuthorId }