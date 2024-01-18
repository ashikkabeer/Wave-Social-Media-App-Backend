const authServices = require('./authServices');
const CloudServices = require('./cloudServices');
const UserModels = require('../models/userModels');


class UserServices {
  getUsernameFromParams = (req) => {
    return req.params.username;
  };
  updateCoverPictureService = async () => {};
  updateProfilePictureService = async (req) => {
    const username = this.getUsernameFromParams(req);
    const imageUrl = await CloudServices.uploadImagetoCloud(req.file.buffer);
    const user =await UserModels.findUserByIdAndUpdateProfilePhoto(
      username,
      imageUrl
    );
    return user;
  };

  updateProfileService = async () => {};
  updatePostList = async (authorId, tweetDataId) => {
    return await UserModels.findUserByIdAndUpdatePostList(authorId, tweetDataId);
  };
  // getUserByUsername = async (username) => {
  //   let user = UserModels.findUserByUsername(username)
  //   if (!user) {
  //     throw new Error('User not found');
  //   }
  //   return user;
  // };

  userInfoService = async (req) => {
    const username = this.getUsernameFromParams(req);
    let userFromDb = await UserModels.findUserByUsername(username)
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
