require('dotenv').config();
const bcrypt = require('bcrypt');
const { validateUser } = require('../util/dataValidation/validation');

const collegeServices = require('./collegeServices');
const UserModels = require('../models/userModels');

class authServices {
  static isAuthorized = async (req, username) => {
    if (req.session.user.username === username) {
      return true;
    }
    return false;
  };

  // static findUserByUsername = async (username) => {
  //   const foundUser = await User.findOne({ username: username });
  //   if (!foundUser) {
  //     const error = new Error('User not found');
  //     error.status = 404;
  //     throw error;
  //   }
  //   return foundUser;
  // };

  static loginService = async (req) => {
    const user = await UserModels.findUserByUsername(req.body.username)
    await this.comparePassword(req.body.password, user.password);
    req.session.user = user;
    return req.session.user;
  };

  static signUpService = async (userData) => {
    const collegeName = await collegeServices.getCollegeById(
      userData.collegeId
    );
    const salt_rounds = parseInt(process.env.SALT_ROUND);
    const hashedPassword = this.hashPassword(userData.password, 10);
    let users = {
      name: userData.name,
      username: userData.username,
      password: userData.password,
      email: userData.email,
      collegeId: userData.collegeId,
      collegeName: collegeName,
      gender: userData.gender,
    };

    const validation = validateUser(users);
    if (validation.error) {
    const error = new Error('Data Entered is not valid');
      error.stack = 404;
      throw error;
    }
    users = {
      name: userData.name,
      username: userData.username,
      password: hashedPassword,
      email: userData.email,
      collegeId: userData.collegeId,
      collegeName: collegeName,
      gender: userData.gender,
    };
    // users.collegeName = await collegeControl.getCollegeById(users.collegeId);

    const user = await UserModels.createUser(users)
    if (!user) {
      const error = new Error('Signup Failed');
      error.stack = 404;
      throw error;
    }
    return await collegeServices.updateColleges(userData.collegeId, user._id);
  };

  static renderSignupService = async () => {
    const college = await collegeServices.getAllCollege();
  };

  static hashPassword = async (password, saltRounds) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  };
  
  static comparePassword = async (givenPassword, hashedPassword) => {
    const passwordMatch = await bcrypt.compare(givenPassword, hashedPassword);
    if (!passwordMatch) {
      const error = new Error('Password Mismatch. Try again.');
      error.status = 404;
      throw error;
    }
    return passwordMatch;
  };
}

module.exports = authServices;
