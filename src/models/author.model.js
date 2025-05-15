const db = require('../config/db.config');

const selectAll = async (page = 0, limit = 0) => {
    const [ result ] = await db.query(`
        SELECT name, email, image FROM author
        ${limit > 0 ? 'LIMIT ?' : ''}
        ${(limit > 0 && page > 0) ? 'OFFSET ?' : ''}
        `, [limit, limit * (page - 1)]
    );
    if (result.length === 0 && page > 0 && limit > 0) {
        return { error: 'No authors found for that specific page and limit.' };
    }
    return { 
        page: (page > 0 && limit > 0) ? page : undefined, 
        limit: (limit > 0) ? limit : undefined, 
        authors: result
    };
}

const insert = async ({ name, email, image }) => {
    const [ result ] = await db.query('INSERT INTO author (name, email, image) VALUES (?, ?, ?)', [ name, email, image ]);
    return { author: { id: result.insertId, name, email, image }, result};
}

module.exports = { selectAll, insert };