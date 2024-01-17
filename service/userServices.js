const { User } = require('../schema/user');
const authServices = require('./authServices');
const CloudServices = require('./cloudServices');

class UserServices {
  getUsernameFromParams = (req) => {
    return req.params.username;
  };
  updateCoverPictureService = async () => {};
  updateProfilePictureService = async (req) => {
    const username = this.getUsernameFromParams(req);
    const imageUrl = await CloudServices.uploadImagetoCloud(req.file.buffer);
    const user = await User.findOneAndUpdate(
      { username: username },
      { profilePhoto: imageUrl }
    );
    return user;
  };

  updateProfileService = async () => {};
  updatePostList = async (authorId, tweetDataId) => {
    await User.findByIdAndUpdate(authorId, {
      $push: { posts: tweetDataId },
    });
  };
  getUserByUsername = async (username) => {
    let user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  };

  userInfoService = async (req) => {
    const username = this.getUsernameFromParams(req);
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
    const isAuthorized = await authServices.isAuthorized(req, username);
    return { isAuthorized, user };
  };
}

module.exports = new UserServices();
