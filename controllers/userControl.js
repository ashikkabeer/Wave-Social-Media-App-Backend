const { User } = require('../model/user');
const College = require('../model/college');
const { extractDate } = require('../util/timeConvertHelper');
let collegeControl = require('./collegeControl');

class UserControls {
  getUsername = (req) => {
    return req.params.username;
  };
  updateCoverPicture = async (req, res) => {
    const username = this.getUsername(req);
  };
  updateProfilePicture = async (req, res) => {
    const username = this.getUsername(req);
  };
  updateProfile = async (req, res) => {
    const username = this.getUsername(req);
  };

  updatePostList = async (authorId, tweetDataId) => {
    await User.findByIdAndUpdate(authorId, {
      $push: { posts: tweetDataId },
    });
  };
  renderEdit = async (req, res, template) => {
    const username = this.getUsername(req);

    if (template === 'editProfile') {
      const college = await collegeControl.getAllCollege();
      return res.render(template, { username, college });
    }
    res.render(template, { username });
  };

  getUserByUsername = async (username) => {
    let user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  };
  userInfo = async (req, res) => {
    const username = this.getUsername(req);
    let userFromDb = await this.getUserByUsername(username);

    const user = {
      name: userFromDb.name,
      username: userFromDb.username,
      collegeId: userFromDb.collegeId,
      collegeName: userFromDb.collegeName,
      posts: userFromDb.posts,
      profilePhoto: userFromDb.profilePhoto || null,
      coverPhoto: userFromDb.coverPhoto || null,
    };

    res.render('userProfile', { user });
  };
}

module.exports = new UserControls();
