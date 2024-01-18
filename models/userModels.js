const { User } = require('../schema/user');

//update profile photo

class UserModels {
  findUserByIdAndUpdateProfilePhoto = async (username, imageUrl) => {
    return await User.findOneAndUpdate(
      { username: username },
      { profilePhoto: imageUrl }
    );
  };


  //update postlist
  findUserByIdAndUpdatePostList = async (authorId, tweetDataId) => {
    return await User.findByIdAndUpdate(authorId, {
      $push: { posts: tweetDataId },
    });
  };


  findUserByUsername = async (username) => {
    return await User.findOne({ username });
  };
  findUserbyId = async (studentId) => {
    return await User.findById(studentId);
  }

  createUser = async (user) => {
    return await User.create(user);
  }
  
}

module.exports = new UserModels();
