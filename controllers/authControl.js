const { comparePassword } = require('../util/hashingHelper');
const { User } = require('../model/user');
const College = require('../model/college');

const bcrypt = require('bcrypt');
let collegeControl = require('./collegeControl');
collegeControl = new collegeControl();
const errorHandler  =require('../middlewares/errorHandler')
const app = require('express')();

app.use(errorHandler)
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
      throw new Error('User not found');
    }
    //compare hashed password - implememnt
    const passwordMatch = await comparePassword(
      req.body.password,
      foundUser.password
    );
    if (!passwordMatch) {
      throw new Error('Password Mismatch. Try again.');
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
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await User.create({
      name: userData.name,
      username: userData.username,
      password: hashedPassword,
      email: userData.email,
      collegeName: userData.collegeName,
      gender: userData.gender,
    });
    if (!user) {
      throw new Error('Signup Failed');
    }
    await collegeControl.updateColleges(userData.collegeName, user._id);
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
    console.log(college);
    res.render('signup', { college });
    throw new Error('Failed to render signup page:');
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
