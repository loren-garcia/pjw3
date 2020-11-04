const express = require('express');
const { getPosts, createPosts } = require('../controllers/posts');
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { createPostsValidator } = require('../validators/index');

const router = express.Router();

router.get('/', requireSignin, getPosts);
router.post('/post', requireSignin, createPostsValidator, createPosts);

// any route containing userId , first will be executed userById()
router.param('userId', userById);

module.exports = router;

/*const getPosts = (req, res) => {
    res.send("Hello from node js");
};

module.exports = {getPosts};

---------- DESTRUCT ----------

exports.getPosts = (req, res) => {
    res.send("Hello from Node Js");
}*/