
const collegeServices = require('../service/collegeServices');


class CollegeControls {

  static addCollege = async (req, res) => {
    const college = await collegeServices.addCollegeService(req.body)
    if (!college) {
      const error = new Error('Invalid input data');
      error.stack = 404;
      throw error;
    } else {
      res.status(200).render('addColleges', {
        message: 'College added successfully',
        data: college,
      });
    }
  };

  
  static renderAddColleges = async (req, res) => {
    let permission = false;
    const role = 'user';
    if (role === 'admin') {
      permission = true;
    }
    // edit this to check the role of the user
    res.render('addColleges', { permission });
  };

 static collegeInfo = async (req, res) => {
    const collegeId = req.params.collegeId;
    const response = await collegeServices.collegeInfoService(collegeId)
    const college = response.college
    const students = response.students
    return await res.render('collegeProfile', { college, students, loggedIn: true });
  };

  static searchCollegeUsingName = async (req, res) => {
    const searchKey = req.query.key
    return await collegeServices.searchCollegeUsingName(searchKey)
  }
}

module.exports = CollegeControls;
