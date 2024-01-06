const College = require('../model/college');

class CollegeControls {
  getCollegeById = async (collegeId) => {
    try {
      console.log(collegeId);
      const college = await College.findById(collegeId);
      console.log('in getcollegeby id: ' + college);
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
  };

  searchCollege = async (req, res) => {
    const key = req.query.key;
    //search in database
  };

  getAllCollege = async () => {
    const colleges = await College.find({}).exec();
    const college = await Promise.all(
      colleges.map((college) => {
        return {
          _id: college._id,
          Collegename: college.Collegename,
          location: college.location,
        };
      })
    );
    return college;
  };

  addCollege = async (req, res) => {
    const college = await College.create(req.body);
    if (!college) {
      const error = new Error('Invalid input data');
      error.stack = 404;
      throw error;
    } else {
      res.status(200).render('addcolleges', {
        message: 'College added successfully',
        data: college,
      });
    }
  };

  renderAddColleges = async (req, res) => {
    res.render('addColleges');
  };

  updateColleges = async (collegeId, studentsId) => {
    const update = await College.findByIdAndUpdate(collegeId, {
      $push: { studentIds: studentsId },
    });
    if (!update) {
      const error = new Error('Failed to update students: ');
      error.stack = 404;
      throw error;
    }
  };
}

module.exports = new CollegeControls();
