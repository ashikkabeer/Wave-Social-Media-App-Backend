const PostServices = require('../service/postServices');


class PostControls {
  static renderUploadForm = async (req, res) => {
    res.render('addPost', { loggedIn: true });
  };
  static create = async (req, res) => {
    await PostServices.createPostService(req);
    return res.status(200).redirect('/');
  };

  // add the user data in the post schema
  static retrieveAll = async (req, res) => {
    const data = await PostServices.renderAllPostsService();
    console.log(data);
    // const permission =true; check the role === administrator -> set permission true
    res.render('index', { data, loggedIn: true });
  };
}

module.exports = PostControls;
