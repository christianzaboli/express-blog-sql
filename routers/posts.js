// import di express e proprietá di routing
const express = require('express');
const router = express.Router();

// const posts = require('../data/postsList');
const postsController = require('../controllers/postsController.jsx')

// index
router.get('/', postsController.index)

// show
router.get('/:id', postsController.show)

// post
router.post('/', postsController.post)

// update
router.put('/:id', postsController.update)

// patch
router.patch('/:id', postsController.patch)

// delete
router.delete('/:id', postsController.destroy)

module.exports = router;