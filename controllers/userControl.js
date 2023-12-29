const { User } = require('../schema/user');
const College = require('../schema/college');
const { extractDate } = require('../helpers/timeConvertHelper');
const { comparePassword } = require('../helpers/hashingHelper');
const bcrypt = require('bcrypt');
let collegeControl = require("./collegeControl");

collegeControl = new collegeControl();

class UserControls {
  constructor() {
    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
    this.renderSignup = this.renderSignup.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.updateUserPost = this.updatePostList.bind(this);
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
        res.status(200).redirect('/post');
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
        name:userData.name,
        username: userData.username,
        password: hashedPassword,
        email: userData.email,
        collegeName: userData.collegeName,
        gender: userData.gender,
      });
      if (!user) {
        res.status(401).send('Failed to sign up');
      }
      await collegeControl.updateColleges(userData.collegeName, user._id);
      res.status(200).send('Sign-up successful');
    } catch (error) {
      console.error('signUp error:', error);
      throw new Error('Failed to sign up: ' + error.message);
    }
  }

  async renderSignup(req, res) {
    try {
      const colleges = await College.find({}).exec();
      const college = await Promise.all(
        colleges.map(async (college) => {
          return {
            _id: college._id,
            Collegename: college.Collegename,
            location:college.location,
          };
        })
      );
      console.log(college)
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

  async updatePostList(authorId, tweetDataId) {
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
      console.log(strippedUser);
    } catch (error) {
      console.error('Error fetching user information:', error);
      // throw new Error('Failed to fetch user information: ' + error.message);
    }
  }
}

module.exports = UserControls;
