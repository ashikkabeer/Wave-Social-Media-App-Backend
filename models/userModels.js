const { User } = require('../schema/user');

//update profile photo

class UserModels {
  static findUserByIdAndUpdateProfilePhoto = async (username, imageUrl) => {
    return await User.findOneAndUpdate(
      { username: username },
      { profilePhoto: imageUrl }
    );
  };


  //update postlist
  static findUserByIdAndUpdatePostList = async (authorId, tweetDataId) => {
    return await User.findByIdAndUpdate(authorId, {
      $push: { posts: tweetDataId },
    });
  };


  static findUserByUsername = async (username) => {
    return await User.findOne({ username });
  };
  static findUserbyId = async (studentId) => {
    return await User.findById(studentId);
  }

  static createUser = async (user) => {
    return await User.create(user);
  }
  
}

module.exports = UserModels;
