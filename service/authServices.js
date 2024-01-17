require('dotenv').config();
const { comparePassword, hashPassword } = require('../util/hashingHelper');
const { User } = require('../schema/user');
const { validateUser } = require('../util/dataValidation/validation');
const collegeServices = require('./collegeServices');
class authServices {
  isAuthorized = async (req, username) => {
    if (req.session.user.username === username) {
      return true;
    }
    return false;
  };

  findUserByUsername = async (username) => {
    const foundUser = await User.findOne({ username: username });
    if (!foundUser) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }
    return foundUser;
  };

  loginService = async (req) => {
    const user = await this.findUserByUsername(req.body.username);
    await comparePassword(req.body.password, user.password);
    req.session.user = user;
    return req.session.user;
  };

  signUpService = async (userData) => {
    const collegeName = await collegeServices.getCollegeById(
      userData.collegeId
    );
    const salt_rounds = process.env.SALT_ROUND;
    const hashedPassword = await hashPassword(userData.password, 10);
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

    const user = await User.create(users);
    if (!user) {
      const error = new Error('Signup Failed');
      error.stack = 404;
      throw error;
    }
    await collegeServices.updateColleges(userData.collegeId, user._id);
  };

  renderSignupService = async () => {
    const college = await collegeServices.getAllCollege();
  };
}

module.exports = new authServices();
