const db = require('../config/db.config');

const selectAll = async (page = -1, limit = 0) => {
    const [ result ] = await db.query(`
        SELECT name, email, image FROM author
        ${limit > 0 ? 'LIMIT ?' : ''}
        ${(limit > 0 && page >= 0) ? 'OFFSET ?' : ''}
        `, [limit, limit * (page - 1)]);
    return result;
}


const checkInsertRequest = ({ name, email, image }) => {
    return name && email && image;
}

const checkAuthorExists = async (email) => {
    const countQuery = await db.query('SELECT count(email) as count FROM author WHERE email = ?', [ email ]);
    return countQuery[0][0].count > 0
}

const insert = async ({ name, email, image }) => {
    const [ result ] = await db.query('INSERT INTO author (name, email, image) VALUES (?, ?, ?)', [ name, email, image ]);
    return { author: { id: result.insertId, name, email, image }, result};
}

module.exports = { selectAll, insert, checkAuthorExists, checkInsertRequest };