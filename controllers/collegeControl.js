const College = require('../model/college');

class CollegeControls {
  constructor() {
    this.addCollege = this.addCollege.bind(this);
    this.updateStudents = this.updateColleges.bind(this);
    this.renderAddColleges = this.renderAddColleges.bind(this);
  }
  async addCollege(req, res) {
    const college = await College.create(req.body);
    if (!college) {
      throw new Error('Invalid input data');
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
    if(!update) {
      throw new Error('Failed to update students: ');
    }
  }
}

module.exports = CollegeControls;
