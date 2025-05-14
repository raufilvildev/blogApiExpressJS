const { selectAll, insert } = require("../models/author.model");

const getAll = async (req, res) => {
    const { page, limit } = req.query;
    result = await selectAll(Number(page), Number(limit));
    if (result.length === 0 && page > 0 && limit > 0) {
        return res.status(404).json({ error: 'No authors found for that specific page and limit.' });
    }
    res.json({ 
        page: (page > 0 && limit > 0) ? page : undefined, 
        limit: (limit > 0) ? limit : undefined, 
        authors: result
    });
}

const create = async (req, res) => {
    result = await insert(req.body);
    if (result.error) {
        return res.status(400).json(result);
    }
    res.json(result);
}
module.exports = { getAll, create };