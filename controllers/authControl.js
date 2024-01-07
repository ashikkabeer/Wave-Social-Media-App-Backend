const { comparePassword, hashPassword } = require('../util/hashingHelper');
const { User } = require('../model/user');
const {
  userSchema,
  validateUser,
} = require('../util/dataValidation/validation');
const bcrypt = require('bcrypt');
let collegeControl = require('./collegeControl');
require('dotenv').config();
class authControls {
  isAuthorized = async (req, username) => {
    if (req.session.user.username === username) {
      return true;
    }
    return false;
  };
  findUserByUsername = async (username) => {
    const foundUser = await User.findOne({ username: username });
    if (!foundUser) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }
    return foundUser;
  };
  login = async (req, res) => {
    const foundUser = await this.findUserByUsername(req.body.username);
    await comparePassword(req.body.password, foundUser.password);
    req.session.user = foundUser;
    req.session.loggedIn = true;
    console.log('user logged in');

    if (req.session) {
      res.status(200).redirect('/post');
    } else {
      throw new Error('Authentication Failed');
    }
  };
  signUp = async (req, res) => {
    const userData = req.body;
    // const validation = validateUser(userData)
    // if(validation.error) {
    //   console.log(validation.error)
    //   const error = new Error('Data Entered is not valid');

    //   error.stack = 404;
    //   throw error;
    // }
    const collegeName = await collegeControl.getCollegeById(userData.collegeId);
    const salt_rounds = process.env.SALT_ROUND;
    console.log(salt_rounds);
    const hashedPassword = await hashPassword(userData.password, 10);
    const users = {
      name: userData.name,
      username: userData.username,
      password: hashedPassword,
      email: userData.email,
      collegeId: userData.collegeId,
      collegeName: collegeName,
      gender: userData.gender,
    };
    console.log(users);
    users.collegeName = await collegeControl.getCollegeById(users.collegeId);
    const user = await User.create(users);
    if (!user) {
      const error = new Error('Signup Failed');
      error.stack = 404;
      throw error;
    }
    await collegeControl.updateColleges(userData.collegeId, user._id);
    res.status(200).redirect('/');
  };

  renderSignup = async (req, res) => {
    const college = await collegeControl.getAllCollege();
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
