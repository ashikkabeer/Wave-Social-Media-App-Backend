const { User } = require('../model/user');
const College = require('../model/college');
const { extractDate } = require('../util/timeConvertHelper');
let collegeControl = require('./collegeControl');

collegeControl = new collegeControl();

class UserControls {
  constructor() {
    this.updateUserPost = this.updatePostList.bind(this);
    this.userInfo = this.userInfo.bind(this);
  }
  async editProfilePhtot(req, res) {
    const url = req.originalUrl;
    const urlSegments = url.split('/');
    const lastSegment = urlSegments[urlSegments.length - 1];
    res.render('editProfilePhoto',{photo:lastSegment,user,})
  }
  async updatePostList(authorId, tweetDataId) {
    await User.findByIdAndUpdate(authorId, {
      $push: { posts: tweetDataId },
    });
  }

  async userInfo(req, res) {
    const username = req.params.username;
    let user = await User.findOne({ username });

    if (!user) {
      throw new Error('User not found');
    }
    user = {
      name: user.name,

      username: user.username,
      collegeId: user.collegeId,
      collegeName: user.collegeName,
      posts: user.posts,
      profilePhoto: user.profilePhoto || null,
      coverPhoto: user.coverPhoto || null,
    };
    res.render('userProfile'), { user };
    console.log(strippedUser);
  }
}

module.exports = UserControls;
