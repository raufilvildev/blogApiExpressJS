const db = require('../config/db.config');

const checkAuthorExists = async (req, res, next) => {
    const { author_id } = req.params;

    if (isNaN(author_id)) {
        res.status(404).json({ error: 'id must be a number.'});
    }

    const [ result ] = await db.query('SELECT id FROM author WHERE id = ?', [ author_id ]);

    if (result.length === 0) {
        return res.status(404).json({ error: 'No authors found.'});
    }
    next();
}

const checkInsert = async (req, res, next) => {
    const { name, email, image } = req.body;
    
    if (!name || !email || !image) {
        return res.status(400).json({ error: 'Name, email, and image are required.' })
    }
    
    const [ result ] = await db.query('SELECT email FROM author WHERE email = ?', [ email ]);

    if (result.length > 0) {
        return res.status(400).json({ error: 'Author already exists with that email.' });
    }

    next();
}

module.exports = { checkAuthorExists, checkInsert };