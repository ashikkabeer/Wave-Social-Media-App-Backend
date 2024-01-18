
const collegeServices = require('../service/collegeServices');


class CollegeControls {

  searchCollege = async (req, res) => {
    const key = req.query.key;
    //search in database
  };



  
  addCollege = async (req, res) => {
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

  renderAddColleges = async (req, res) => {
    let permission = false;
    const role = 'user';
    if (role === 'admin') {
      permission = true;
    }
    // edit this to check the role of the user
    res.render('addColleges', { permission });
  };




  //completely change this function. add a schema to get the post id 
  // to college db. each college have a list

  collegeInfo = async (req, res) => {
    const collegeId = req.params.collegeId;
    const response = await collegeServices.collegeInfoService(collegeId)
    const college = response.college
    const students = response.students
    await res.render('collegeProfile', { college, students, loggedIn: true });
  };
}

module.exports = new CollegeControls();
