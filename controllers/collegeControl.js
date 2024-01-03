const College = require('../model/college');

class CollegeControls {
  constructor() {
    this.addCollege = this.addCollege.bind(this);
    this.updateStudents = this.updateColleges.bind(this);
    this.renderAddColleges = this.renderAddColleges.bind(this);
    this.getCollegeById = this.getCollegeById.bind(this);
  }
  async getCollegeById(collegeId) {
    try {
      const college = await College.findById(collegeId);
      if (college) {
        console.log(college);
        let collegeName = college.Collegename;
        return collegeName;
      } else {
        console.log('College not found');
        return null; // or handle the absence of the college in an appropriate way
      }
    } catch (error) {
      console.log(error);
    }
  }

  async searchCollege(req, res) {
    const key = req.query.key;
    //search in database
  }

  async addCollege(req, res) {
    const college = await College.create(req.body);
    if (!college) {
      const error = new Error('Invalid input data');
      error.stack = 404;
      throw error;
    } else {
      res.status(200).json({ message: 'Operation successful', data: college });
    }
  }

  async renderAddColleges(req, res) {
    res.render('addcolleges');
  }

  async updateColleges(collegeId, studentsId) {
    const update = await College.findByIdAndUpdate(collegeId, {
      $push: { studentIds: studentsId },
    });
    if (!update) {
      const error = new Error('Failed to update students: ');
      error.stack = 404;
      throw error;
    }
  }
}

module.exports = CollegeControls;
