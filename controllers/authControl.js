const authServices = require('../service/authServices');
const collegeServices = require('../service/collegeServices');
class authControls {
  login = async (req, res) => {
    const response = await authServices.loginService(req);
    if (response) {
      return res.status(200).redirect('/post');
    } else {
      throw new Error('Authentication Failed');
    }
  };
  signUp = async (req, res) => {
    const userData = req.body;
    const response = await authServices.signUpService(userData);
    res.status(200).redirect('/');
  };

  renderSignup = async (req, res) => {
    const college = await collegeServices.getAllCollege();
    res.render('signup', { college });
  };
  renderLogin = async (req, res) => {
    res.render('login');
  };
  logout = async (req, res) => {
    req.session.destroy(() => {
      res.redirect('/');
    });
  };
}

module.exports = new authControls();
