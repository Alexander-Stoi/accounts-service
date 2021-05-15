const router = require(`express`).Router();
const { response } = require("express");

const adminGuard = require('../helpers/admin-guard');
const authenticate = require('../helpers/verify-token');
// const { join } = require("node:path");
const PostController = require(`../controllers/posts`);
const postController = new PostController();


router.post(`/`, async (req, res) => {
    const post = req.body;

    postController.postBlogPost(post).then((response) => {
        res.status(200).json(response)
    })
})

router.get(`/`, authenticate, (req, res) => {
    postController.getBlogPosts().then((response) => {
        res.status(200).json(response)
    })
})

router.delete(`/:id?`, authenticate, adminGuard, (req, res) => {
    const id = req.params.id;

    if (id) {
        postController.deletePost(id).then((response) => {
            res.status(200).json(response);
        })
    }

})

router.put(`/:id`, authenticate, adminGuard, (req, res) => {
    const id = req.params.id;
    const body = req.body;

    if (id && body) {
        postController.putPost(id, body).then((response) => {
            res.status(200).json(response);
        })
    }
})


module.exports = router;