const posts = require('../data/postsList');

// index
function index(req, res) {

    //random function per testare il middleware errorsHandler
    testMiddleware.get();

    let filteredPosts = posts;

    if (req.query.tags) { // condizione che si avvera solo nel caso compaia una query 'tags'
        filteredPosts = filteredPosts.filter(post => post.tags.find(tag => tag === req.query.tags))
    }
    res.json(filteredPosts);
}

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
    if (posts.find(post => post.id === parseInt(req.params.id))) {  // controllo se il post richiesto esiste
        posts.splice(posts.indexOf(posts.find(post => post.id === parseInt(req.params.id))), 1);  // eliminito tale post nel caso esista
        console.log(posts);
        res.sendStatus(204)
    } else {
        res.status(404), // restituisco un json di not found nel caso opposto
            res.json({ error: 'Not Found', message: 'Post not found' })

    }
}

module.exports = { index, show, post, update, patch, destroy } 