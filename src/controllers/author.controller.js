const { selectAll, insert } = require("../models/author.model");

const getAll = async (req, res) => {
    const { page, limit } = req.query;

    result = await selectAll(Number(page), Number(limit));

    if (result.error) {
        return res.status(404).json(result);
    }
    
    res.json(result);
}

const create = async (req, res) => {
    result = await insert(req.body);
    res.json(result);
}

module.exports = { getAll, create };