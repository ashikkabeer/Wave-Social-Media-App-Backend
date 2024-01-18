require('dotenv').config();
const CloudServices = require('./cloudServices');
const UserServices = require('./userServices');
const PostModels = require('../models/postModels');
class PostServices {
  createPostService = async (req, res) => {
    if (!req.session || !req.session.user || !req.session.user._id) {
      throw new Error('user not authenticated');
    }
    if (!req.body.title || !req.body.content) {
      throw new Error('Title and content are required');
    }
    let data = {
      title: req.body.title,
      content: req.body.content,
      authorId: req.session.user._id,
      authorUsername: req.session.user.username,
      authorCollegeId: req.session.user.collegeId,
      authorCollegeName: req.session.user.collegeName,
    };
    if (req.file) {
      console.log('image found');
      const imageUrl = await CloudServices.uploadImagetoCloud(req.file.buffer);

      data.images = imageUrl;
    }
    const post = await PostModels.createPost(data);
    const response = await UserServices.updatePostList(post.authorId, post._id);
    return response;
  };

  renderAllPostsService = async () => {
    const posts = await PostModels.getAllPosts();
    if (!posts) {
      const error = new Error('Unable to retrieve data');
      error.stack = 404;
      throw error;
    }
    const formattedPosts = await Promise.all(
      posts.map((post) => {
        return {
          title: post.title,
          content: post.content,
          image: post.images,
          authorId: post.authorId,
          authorUsername: post.authorUsername,
          authorCollegeId: post.authorCollegeId,
          authorCollegeName: post.authorCollegeName,
          upvotes: post.upvotes,
          views: post.views,
          date: post.createdAt,
        };
      })
    );
    const data = formattedPosts.filter((post) => post !== null);
    return data;
  };
}

module.exports = new PostServices();
