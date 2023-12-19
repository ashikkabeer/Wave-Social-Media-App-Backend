const util = require('util');
const { User } = require('../schema/user');
const { updateStudents } = require('./collegeControl');
const session = require('express-session');
const College = require('../schema/college');
// import College from '../schema/college';
const { extractDate } = require('../helpers/timeConvertHelper');
const { hashPassword, comparePassword } = require('../helpers/hashingHelper');
const bcrypt = require('bcrypt');

class UserControls {
  constructor() {
    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
  }
  async login(req, res) {
    try {
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
        throw new Error('Wrong password');
      }
      req.session.user = foundUser;
      req.session.loggedIn = true;
      if (req.session) {
        res.status(200).redirect('/');
      } else {
        res.status(401).json({ error: 'Authentication failed' });
      }
    } catch (error) {
      console.error('Login error:', error.message);
      throw new Error('Login failed: ' + error.message);
    }
  }
  async signUp(req, res) {
    try {
      const userData = req.body;
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const user = await User.create({
        username: userData.username,
        password: hashedPassword,
        email: userData.email,
        collegeName: userData.collegeName,
        gender: userData.gender,
      });
      await updateStudents(userData.collegeName, user._id);
      // .then(async (data) => {
      //   await updateStudents(data.collegeName, data._id);
      // });
      if (!user) {
        res.status(401).send('Failed to sign up');
      }
      res.status(200).send('Sign-up successful');
    } catch (error) {
      console.error('signUp error:', error);
      throw new Error('Failed to sign up: ' + error.message);
    }
  }

  // async getCollegeNames(req, res) {
  //   try {
  //     const college = await College.find({});
  //     res.send(college);
  //   } catch (error) {
  //     console.error('Error fetching college names:', error);
  //     throw new Error('Failed to fetch college names: ' + error.message);
  //   }
  // }
  async renderSignup(req, res) {
    try {
      const college = await College.find({});
      res.render('signup', { college });
    } catch (error) {
      console.error('Error rendering signup:', error);
      throw new Error('Failed to render signup: ' + error.message);
    }
  }
  async renderLogin(req, res) {
    try {
      res.render('login');
    } catch (error) {
      console.error('Error rendering login:', error);
      throw new Error('Failed to render login: ' + error.message);
    }
  }



  async updateUserPost(authorId, tweetDataId) {
    try {
      await User.findByIdAndUpdate(authorId, {
        $push: { posts: tweetDataId },
      });
    } catch (error) {
      console.error('Error updating user posts:', error);
      throw new Error('Failed to update user posts: ' + error.message);
    }
  }

  async logout(req, res) {
    try {
      req.session.destroy(() => {
        res.redirect('/');
      });
    } catch (error) {
      console.error('Error during logout:', error);
      throw new Error('Failed to logout: ' + error.message);
    }
  }

  async info(req, res) {
    try {
      const username = req.params.username;
      const user = await User.findOne({ username });

      if (!user) {
        res.status(404).json({ error: 'User not found' });
      }
      const formattedDate = await extractDate(user.createdAt);
      const collegeName = await College.findById(user.collegeName);

      const strippedUser = {
        username: user.username,
        collegeName: collegeName.Collegename,
        gender: user.gender,
        posts: user.posts,
        totalPosts: user.totalPosts,
        createdAt: [formattedDate[0], formattedDate[1]],
      };
      res.status(200).json(strippedUser);
    } catch (error) {
      console.error('Error fetching user information:', error);
      // throw new Error('Failed to fetch user information: ' + error.message);
    }
  }
}

module.exports = UserControls;