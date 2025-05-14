const { selectAll, insert, selectByAuthorId, checkAuthorExists } = require("../models/post.model");

const getAll = async (req, res) => {
    const { groupedByAuthor, page, limit } = req.query;
    const result = await selectAll({ 
        groupedByAuthor, 
        page: Number(page), 
        limit: Number(limit)
    });

    if (result.length === 0 && page > 0 && limit > 0) {
        return res.status(404).json({ error: 'No posts found for that specific page and limit.' });
    }

    res.json({ 
        page: (page > 0 && limit > 0) ? page : undefined, 
        limit: (limit > 0) ? limit : undefined, 
        posts: result
    });
}

const getByAuthorId = async (req, res) => {

    const authorExists = await checkAuthorExists(req.params.author_id);
    
    if (!authorExists) {
        return res.status(404).json({ error: 'No authors found for that author_id.' });
    }

    result = await selectByAuthorId({ 
        author_id: req.params.author_id, 
        page: Number(req.query.page), 
        limit: Number(req.query.limit)
    });

    if (result.length === 0) {
        return res.status(404).json({ error: 'No posts found for that author_id or specific page and limit.' });
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