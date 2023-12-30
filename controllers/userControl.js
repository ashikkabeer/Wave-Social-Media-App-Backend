const { User } = require('../model/user');
const College = require('../model/college');
const { extractDate } = require('../util/timeConvertHelper');
let collegeControl = require('./collegeControl');

collegeControl = new collegeControl();

class UserControls {
  constructor() {
    this.updateUserPost = this.updatePostList.bind(this);
  }

  async updatePostList(authorId, tweetDataId) {
    await User.findByIdAndUpdate(authorId, {
      $push: { posts: tweetDataId },
    });
  }

  async info(req, res) {
    const username = req.params.username;
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error('User not found')
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
  }
}

module.exports = UserControls;
