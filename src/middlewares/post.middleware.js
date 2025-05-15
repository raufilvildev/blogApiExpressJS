const db = require('../config/db.config');

const checkInsert = async (req, res, next) => {
    const { title, description, category, author_id } = req.body;
    
    if (!title || !description || !category || !author_id) {
        return res.status(400).json({ error: 'Title, description, category, and author_id are required.' })
    }
    
    const [ result ] = await db.query('SELECT title FROM post WHERE title = ?', [ title ]);
    
    if (result.length > 0) {
        return res.status(404).json({ error: 'Post already exists with that title.' });
    }

    next();
}

module.exports = { checkInsert };