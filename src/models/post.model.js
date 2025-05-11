const db = require('../config/db.config');
const dayjs = require('dayjs');

const selectAll = async (groupedByAuthor = false) => {
    
    const [ result ] = await db.query('SELECT t1.title, t1.description, t1.createdAt, t1.category, t2.name, t2.email, t2.image FROM post AS t1 INNER JOIN author AS t2 ON t1.author_id = t2.id' + (groupedByAuthor ? ' ORDER BY t2.name' : ''));
    if (groupedByAuthor) {
        oldName = '';
        authorNumber = -1;
        resultGroupedByAuthor = [];
        result.forEach((post) => {
            const currentName = post.name;
            if (currentName !== oldName) {
                authorNumber++;
                resultGroupedByAuthor.push({
                    name: currentName,
                    email: post.email,
                    image: post.image,
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
        return resultGroupedByAuthor;
    }
    return result;
}

const selectByAuthorId = async (author_id) => {
    const countQuery = await db.query('SELECT count(id) as count FROM author WHERE id = ?', [ author_id ]);
    if (countQuery[0][0].count === 0) {
        return { error: 'No authors found for that author_id.' }
    }
    
    const [ result ] = await db.query('SELECT title, description, createdAt, category FROM post WHERE author_id = ?', [ author_id ]);
    
    if (result.length === 0) {
        return { error: 'No posts found for that author_id.' }
    }

    return result;
}

const insert = async ({ title, description, category, author_id }) => {
    const countQuery = await db.query('SELECT count(title) as count FROM post WHERE title = ?', [ title ]);
    if (countQuery[0][0].count > 0) {
        return { error: 'Post already exists with that title.' }
    }

    if (!title || !description || !category || !author_id) {
        return { error: 'Title, description, category, and author_id are required.' }
    }
    const createdAt = dayjs().format('YYYY-MM-DD');
    const [ result ] = await db.query('INSERT INTO post (title, description, createdAt, category, author_id) VALUES (?, ?, ?, ?, ?)', [ title, description, createdAt, category, author_id ]);
    return {post: { title, description, createdAt, category, author_id }, result };
}

module.exports = { selectAll, selectByAuthorId, insert };