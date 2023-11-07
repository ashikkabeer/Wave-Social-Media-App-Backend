const util = require("util");
const { User } = require("../schema/user");
const { updateStudents } = require("./collegeControl");
const session = require("express-session");
const { College } = require("../schema/college");
const { extractDate } = require("../helpers/timeConvertHelper");
const { hashPassword, comparePassword } = require("../helpers/hashingHelper");
const bcrypt = require("bcrypt");
const SignUp = async (userData) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await User.create({
      username: userData.username,
      password: hashedPassword,
      email: userData.email,
      collegeName: userData.collegeName,
      gender: userData.gender
    })
    await updateStudents(userData.collegeName, user._id);
    // .then(async (data) => {
    //   await updateStudents(data.collegeName, data._id);
    // });
    return user;
  } catch (error) {
    console.error('SignUp error:', error);
    throw new Error('Failed to sign up: ' + error.message);
  }
};

const Login = async (req) => {
  try {
    const foundUser = await User.findOne({ username: req.body.username });
    console.log(foundUser)
    if (!foundUser) {
      throw new Error("User not found");
    }

    const passwordMatch = await comparePassword(
      req.body.password,
      foundUser.password
    );
    if (!passwordMatch) {
      throw new Error("Wrong password");
    }
    req.session.user = foundUser;
    req.session.loggedIn = true;
    return req.session;
  } catch (error) {
    console.error('Login error:', error.message);
    throw new Error('Login failed: ' + error.message);
  }
};

const updateUserPost = async (authorId, tweetDataId) => {
  try {
    await User.findByIdAndUpdate(authorId, {
      $push: { posts: tweetDataId },
    });
  } catch (error) {
    console.error('Error updating user posts:', error);
    throw new Error('Failed to update user posts: ' + error.message);
  }
};

const userInfo = async (username) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error('User not found');
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
    return strippedUser;
  } catch (error) {
    console.error('Error fetching user information:', error);
    throw new Error('Failed to fetch user information: ' + error.message);
  }
};

module.exports = {
  SignUp,
  Login,
  userInfo,
  updateUserPost,
};
