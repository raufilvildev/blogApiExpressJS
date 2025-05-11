const { selectAll, insert } = require("../models/author.model");

const getAll = async (req, res) => {
    result = await selectAll();
    res.json(result);
}

const create = async (req, res) => {
    result = await insert(req.body);
    if (result.error) {
        return res.status(400).json(result);
    }
    res.json(result);
}
module.exports = { getAll, create };