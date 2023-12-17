const College = require('../schema/college');
const { User } = require('../schema/user');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const addCollege = async (collegeData) => {
  try {
    const college = await College.create(collegeData);
    return college;
  } catch (error) {
    throw new Error('Failed to add college: ' + error.message);
  }
};

const updateStudents = async (collegeId, studentsId) => {
  try {
    console.log('updating');
    await College.findByIdAndUpdate(collegeId, {
      $push: { studentIds: studentsId },
    });
  } catch (error) {
    throw new Error('Failed to update students: ' + error.message);
  }
};

module.exports = {
  addCollege,
  updateStudents,
};
