const { updateUserPost } = require('./userControl');
const { User } = require('../model/user');
let UserControls = require('./userControl');
let CloudControls = require('./cloudControl');
const Post = require('../model/post');

require('dotenv').config();
class PostControls {
  constructor () {
    this.renderUploadForm = this.renderUploadForm.bind(this)
  }
  async renderUploadForm (req, res) {
    res.render('addPost', { loggedIn: true });
  };
  create = async (req, res) => {
    if (!req.session || !req.session.user || !req.session.user._id) {
      throw new Error('user not authenticated');
    }
    if (!req.body.title || !req.body.content) {
      throw new Error('Title and content are required');
    }
    const authorId = req.session.user._id;
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
      const imageUrl = await CloudControls.uploadImagetoCloud(req.file.buffer);

      data.images = imageUrl;
    }
    const post = await Post.create(data);
    await UserControls.updatePostList(post.authorId, post._id);
    return res.status(200).redirect('/');
  };

  // add the user data in the post schema
  retrieveAll = async (req, res) => {
    const posts = await Post.find({}).exec();
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
          authorCollegeName:post.authorCollegeName,
          upvotes: post.upvotes,
          views: post.views,
          date: post.createdAt,
        };
      })
    );
    const data = formattedPosts.filter((post) => post !== null);
    console.log(data)
    res.render('index', { data, loggedIn: true });
  };
}

module.exports = new PostControls();
