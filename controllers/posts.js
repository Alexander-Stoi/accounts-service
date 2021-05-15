const PostModel = require(`../models/posts`);
const postModel = new PostModel();

class PostController {
    postBlogPost(post) {
        return postModel.createPost(post);
    }

    getBlogPosts() {
        return postModel.getAllPosts();
    }

    deletePost(id) {
        return postModel.deletePostById(id);
    }

    putPost(id, body) {
        return postModel.updatePostById(id, body);
    }

}



module.exports = PostController;