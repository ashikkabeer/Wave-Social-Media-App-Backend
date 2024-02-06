const Post = require('../schema/post');

class PostModels {
  static getPostById = async (postId) => {
    return await Post.findById(postId);
  };

  static createPost = async (post) => {
    return await Post.create(post);
  };

  static getAllPosts = async () => {
    return await Post.find({}).sort({createdAt: -1}).exec();
  };
}

module.exports = PostModels;
