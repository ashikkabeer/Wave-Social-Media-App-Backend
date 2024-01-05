const { comparePassword } = require('../util/hashingHelper');
const { User } = require('../model/user');
const College = require('../model/college');
const {userSchema, validateUser} = require('../util/dataValidation/validation')
const bcrypt = require('bcrypt');
let collegeControl = require('./collegeControl');
collegeControl = new collegeControl();
const errorHandler = require('../middlewares/errorHandler');
const app = require('express')();

app.use(errorHandler);
class authControls {
  constructor() {
    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
    this.renderSignup = this.renderSignup.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.logout = this.logout.bind(this);
  }
  async login(req, res) {
    const foundUser = await User.findOne({ username: req.body.username });
    if (!foundUser) {
      const error = new Error('User not found');
      error.status = 404
      throw error
    }
    //compare hashed password - implememnt
    const passwordMatch = await comparePassword(
      req.body.password,
      foundUser.password
    );
    if (!passwordMatch) {
      const error = new Error('Password Mismatch. Try again.');
      error.status = 404;
      throw error;
    }
    req.session.user = foundUser;
    req.session.loggedIn = true;
    if (req.session) {
      res.status(200).redirect('/post');
    } else {
      throw new Error('Authentication Failed');
    }
  }
  async signUp(req, res) {
    const userData = req.body;
    // const validation = validateUser(userData)
    // if(validation.error) {
    //   console.log(validation.error)
    //   const error = new Error('Data Entered is not valid');
      
    //   error.stack = 404;
    //   throw error;
    // }
    const collegeName =await collegeControl.getCollegeById(userData.collegeId)
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const users = {
      name: userData.name,
      username: userData.username,
      password: hashedPassword,
      email: userData.email,
      collegeId:userData.collegeId,
      collegeName: collegeName,
      gender: userData.gender,
    }
    console.log(users)
    users.collegeName =await collegeControl.getCollegeById(users.collegeId)
    console.log('collegename: ' + users.collegeName)
    const user = await User.create(users);
    if (!user) {
      const error = new Error('Signup Failed');
      error.stack = 404;
      throw error;
    }
    await collegeControl.updateColleges(userData.collegeId, user._id);
    res.status(200).redirect('/');
  }

  async renderSignup(req, res) {
    const colleges = await College.find({}).exec();
    const college = await Promise.all(
      colleges.map(async (college) => {
        return {
          _id: college._id,
          Collegename: college.Collegename,
          location: college.location,
        };
      })
    );
    res.render('signup', { college });
  }
  async renderLogin(req, res) {
    res.render('login');
  }
  async logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  }
}

module.exports = authControls;
