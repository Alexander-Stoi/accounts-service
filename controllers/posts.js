const PostModel = require(`../models/posts`);
const postModel = new PostModel();

class PostController {
    postBlogPost(post) {
        return postModel.createPost(post);
    }

    getBlogPosts() {
        return postModel.getAllPosts();
    }
}



module.exports = PostController;