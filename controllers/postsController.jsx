const posts = require('../data/postsList');

// import connessione al database
const sqlConnect = require('../data/db')

// index
function index(req, res) {
    const sql = 'SELECT * FROM posts';

    sqlConnect.query(sql, (err, results) => {
if (err) return res.status(500).json({ error: 'Database query failed' });
res.json(results);
})};

// show
function show(req, res) {
    res.json(posts.find(post => post.id === parseInt(req.params.id)) ?? // versione ridotta senza check della funzione destroy, se é veritiera restituisce a sinistra, mentre falso a destra grazie al nullish
        (res.status(404), res.json({ error: 'Not Found', message: 'Post not found' })));
}

// post
function post(req, res) {
    const newPost = {
        id: posts[posts.length - 1].id + 1,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags,
    }

    posts.push(newPost);
    console.log(posts);

    res.status(201);
    res.json(newPost)
}

// update
function update(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    if (!post) {    // caso di nessun post trovato
        res.status(404);
        return res.json({ error: 'Not Found', message: 'Post not found' })
    }

    // sostituisco le proprieta di tale post con quelle inserite all'api
    post.title = req.body.title
    post.content = req.body.content
    post.image = req.body.image
    post.tags = req.body.tags

    console.log(posts);
    res.json(post)
}

// patch
function patch(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    if (!post) {    // caso di nessun post trovato
        res.status(404);
        return res.json({ error: 'Not Found', message: 'Post not found' })
    }

    // checko tutte le nuove proprieta se esistono, e se si rimpiazzano quelle di prima
    req.body.title ? post.title = req.body.title : post.title = post.title;
    req.body.content ? post.content = req.body.content : post.content = post.content;
    req.body.image ? post.image = req.body.image : post.image = post.image;
    req.body.tags ? post.tags = req.body.tags : post.tags = post.tags;

    console.log(posts);
    res.json(post)

}

// delete
function destroy(req, res) {
    const { id } = req.params;

    sqlConnect.query('DELETE FROM posts WHERE id = ?', [id], 
        (err) => {if (err) return res.status(500).json({ error: 'Failed to delete post'})});
        res.sendStatus(204)
};

module.exports = { index, show, post, update, patch, destroy } 