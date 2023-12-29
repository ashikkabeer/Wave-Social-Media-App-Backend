const College = require('../schema/college');

 class CollegeControls {
  constructor() {
    this.addCollege = this.addCollege.bind(this);
    this.updateStudents = this.updateColleges.bind(this);
    this.renderAddColleges = this.renderAddColleges.bind(this);
  }
  async addCollege(req,res) {
    try {
      const college = await College.create(req.body);
      if (!college) {
        res.status(400).json({ error: 'Bad Request', message: 'Invalid input data' });

    } else {
        res.status(200).json({ message: 'Operation successful', data: college });
    }
    } catch (error) {
      console.log(error)
    }
  }

  async renderAddColleges(req, res) {
    try {
      res.render("addcolleges");
    } catch (error) {
      console.error('Error rendering "addcolleges" view:', error);
      res.sendStatus(500).send('An error occurred while rendering the "addcolleges" view.');
    }
  }

  async updateColleges(collegeId, studentsId) {
    try {
      console.log('updating');
      await College.findByIdAndUpdate(collegeId, {
        $push: { studentIds: studentsId },
      });
    } catch (error) {
      throw new Error('Failed to update students: ' + error.message);
    }
  }
}

module.exports = CollegeControls;