const Post = require('../schema/post');

class PostModels {
  getPostById = async (postId) => {
    return await Post.findById(postId);
  };

  createPost = async (post) => {
    return await Post.create(post);
  };

  getAllPosts = async () => {
    return await Post.find({}).exec();
  };
}

module.exports = new PostModels();
