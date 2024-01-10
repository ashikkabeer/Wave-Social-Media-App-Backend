const { User } = require('../model/user');
const College = require('../model/college');
const { extractDate } = require('../util/timeConvertHelper');
let collegeControl = require('./collegeControl');
const CloudControls = require('./cloudControl');
const authControl = require('./authControl');
const UserServices = require('../service/userServices');
const collegeServices = require('../service/collegeServices');
class UserControls {
  updateCoverPicture = async (req, res) => {
    const response = await UserServices.updateCoverPictureService();
  };
  updateProfilePicture = async (req, res) => {
    const username = await UserServices.getUsernameFromParams(req);
    res.redirect(`user/${username}/edit/profile`);
  };
  updateProfile = async (req, res) => {
    const response = await UserServices.updateProfileService();
  };

  renderEdit = async (req, res, template) => {
    const username = await UserServices.getUsernameFromParams(req);
    if (template === 'editProfile') {
      const college = await collegeServices.getAllCollege();
      return res.render(template, { username, college });
    }
    res.render(template, { username, loggedIn: true });
  };

  getUserByUsername = async (username) => {
    let user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  };
  userInfo = async (req, res) => {
    const response = await UserServices.userInfoService(req);
    const isAuthorized = response.isAuthorized;
    const user = response.user;
    res.render('userProfile', { isAuthorized, user, loggedIn: true });
  };
}

module.exports = new UserControls();
