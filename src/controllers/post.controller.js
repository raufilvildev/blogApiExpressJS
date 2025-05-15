const { selectAll, insert, selectByAuthorId, checkPostRequest, checkPostExists } = require("../models/post.model");

const getAll = async (req, res) => {
    const { groupedByAuthor, page, limit } = req.query;
    const result = await selectAll({ 
        groupedByAuthor, 
        page: Number(page), 
        limit: Number(limit)
    });

    if (result.error) {
        return res.status(404).json(error);
    }

    res.json(result);
}

const getByAuthorId = async (req, res) => {

    result = await selectByAuthorId({ 
        author_id: req.params.author_id, 
        page: Number(req.query.page), 
        limit: Number(req.query.limit)
    });

    if (result.error) {
        return res.status(404).json(result);
    }

    res.json(result);
}

const create = async (req, res) => {
    
    result = await insert(req.body);
    res.json(result);
}
module.exports = { getAll, getByAuthorId, create  }