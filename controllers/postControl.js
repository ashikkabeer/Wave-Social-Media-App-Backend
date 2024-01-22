const PostServices = require('../service/postServices');


class PostControls {
  constructor() {}
  renderUploadForm = async (req, res) => {
    res.render('addPost', { loggedIn: true });
  };
  create = async (req, res) => {
    await PostServices.createPostService(req);
    return res.status(200).redirect('/');
  };

  // add the user data in the post schema
  retrieveAll = async (req, res) => {
    const data = await PostServices.renderAllPostsService();
    console.log(data);
    res.render('index', { data, loggedIn: true });
  };
}

module.exports = new PostControls();
