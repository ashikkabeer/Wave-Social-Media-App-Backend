const { User } = require('../model/user');
const College = require('../model/college');
const { extractDate } = require('../util/timeConvertHelper');
let collegeControl = require('./collegeControl');

collegeControl = new collegeControl();

class UserControls {
  constructor() {
    this.updateUserPost = this.updatePostList.bind(this);
    this.userInfo = this.userInfo.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.updateCoverPicture = this.updateCoverPicture.bind(this);
    this.updateProfilePicture = this.updateProfilePicture.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }
  async updateCoverPicture(req, res) {
    const username = req.params.username;
  }
  async updateProfilePicture(req, res) {
    const username = req.params.username;
  }
  async updateProfile(req, res) {
    const username = req.params.username;
  }

  async updatePostList(authorId, tweetDataId) {
    await User.findByIdAndUpdate(authorId, {
      $push: { posts: tweetDataId },
    });
  }
  async renderEdit(req, res, template) {
    const username = req.params.username;

    if (template === 'editProfile') {
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
      return res.render(template, { username, college });
    }
    res.render(template, { username });
  }

  async userInfo(req, res) {
    const username = req.params.username;
    console.log(username);
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
    console.log(user);
    res.render('userProfile', { user });
  }
}

module.exports = UserControls;
