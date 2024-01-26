const authServices = require('../service/authServices');
const collegeServices = require('../service/collegeServices');


class authControls {

  static login = async (req, res) => {
    const response = await authServices.loginService(req);
    if (response) {
      return res.status(200).redirect('/post');
    } else {
      throw new Error('Authentication Failed');
    }
  };


  static signUp = async (req, res) => {
    const userData = req.body;
    const response = await authServices.signUpService(userData);
    res.status(200).redirect('/');
  };


  static renderSignup = async (req, res) => {
    const college = await collegeServices.getAllCollege();
    res.render('signup', { college });
  };


  static renderLogin = async (req, res) => {
    res.render('login');
  };

  
  static logout = async (req, res) => {
    req.session.destroy(() => {
      res.redirect('/');
    });
  };
}

module.exports = authControls;
