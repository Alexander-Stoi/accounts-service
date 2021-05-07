const router = require(`express`).Router();
// const { response } = require("express");
// const { response } = require("express");
// const { join } = require("node:path");
const PostController = require(`../controllers/posts`);
const postController = new PostController();

router.post(`/`, (req, res) => {
    const post = req.body;

    postController.postBlogPost(post).then((response) => {
        res.status(200).json(response)
    })
})

router.get(`/`, (req, res) => {
    postController.getBlogPosts().then((response) => {
        res.status(200).json(response)
    } )  
})




module.exports = router;