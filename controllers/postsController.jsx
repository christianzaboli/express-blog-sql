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
    const id = req.params.id;

    sqlConnect.query('SELECT * FROM posts WHERE id = ?', [id], (err, results) => {
            if (err) return res.status(500).json({ error: 'Database query error (error)'});
            if (results.length === 0) return res.status(404).json({ error: 'Post not found'});
            res.json(results[0])
        });
}

// post
function post(req, res) {
 
}

// update
function update(req, res) {

}

// patch
function patch(req, res) {


}

// delete
function destroy(req, res) {
    const { id } = req.params;

    sqlConnect.query('DELETE FROM posts WHERE id = ?', [id], 
        (err) => {if (err) return res.status(500).json({ error: 'Failed to delete post'})});
        res.sendStatus(204)
};

module.exports = { index, show, post, update, patch, destroy } 