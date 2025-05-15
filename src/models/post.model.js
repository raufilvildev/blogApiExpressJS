const db = require('../config/db.config');
const dayjs = require('dayjs');

const selectAll = async ({ groupedByAuthor = false, page = 0, limit = 0 }) => {
    let [ result ] = await db.query(`
        SELECT t1.title, t1.description, t1.createdAt, t1.category, 
        t2.name, t2.email, t2.image 
        FROM post AS t1 
        INNER JOIN author AS t2 
        ON t1.author_id = t2.id
        ${groupedByAuthor ? 'ORDER BY t2.name' : ''}
        ${limit > 0 ? 'LIMIT ?' : ''}
        ${(limit > 0 && page > 0) ? 'OFFSET ?' : ''}
        `, [limit, limit * (page - 1)]
    );

    if (result.length === 0) {
        return { error: "No posts found." };
    }
    
    if (groupedByAuthor) {
        oldName = '';
        authorNumber = -1;
        resultGroupedByAuthor = [];
        result.forEach((post) => {
            const currentName = post.name;
            if (currentName !== oldName) {
                authorNumber++;
                resultGroupedByAuthor.push({
                    author: { 
                        name: currentName,
                        email: post.email,
                        image: post.image
                    },
                    posts: []
                });
                oldName = currentName;
            }
            resultGroupedByAuthor[authorNumber].posts.push({
                title: post.title,
                description: post.description,
                createdAt: post.createdAt,
                category: post.category
            });
        })
        result = resultGroupedByAuthor;
    }

    return { 
        page: (page > 0 && limit > 0) ? page : undefined, 
        limit: (limit > 0) ? limit : undefined, 
        posts: result
    };
}


const selectByAuthorId = async ({ author_id, page = 0, limit = 0 }) => {
    const [ result ] = await db.query(`
        SELECT title, description, createdAt, category 
        FROM post 
        WHERE author_id = ?
        ${limit > 0 ? 'LIMIT ?' : ''}
        ${(limit > 0 && page > 0) ? 'OFFSET ?' : ''}
        `, [ author_id, limit, limit * (page - 1)]
    );
    
    if (result.length === 0) {
        return { error: 'No posts found.' };
    }

    return result;
}

const insert = async ({ title, description, category, author_id }) => {
    
    const createdAt = dayjs().format('YYYY-MM-DD');

    const [ result ] = await db.query(`
        INSERT INTO post 
        (title, description, createdAt, category, author_id) 
        VALUES (?, ?, ?, ?, ?)
        `, [ title, description, createdAt, category, author_id ]);
    
        return {post: { title, description, createdAt, category, author_id }, result };
}

module.exports = { selectAll, selectByAuthorId, insert };