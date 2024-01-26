const College = require('../schema/college');

class CollegeModels {
  //get all colleges
  static getAllColleges = async () => {
    return await College.find({}).exec();
  };
  //getcollege by id
  static getCollegeById = async (collegeId) => {
    return await College.findById(collegeId);
  };

  //add college
  static createCollege = async (college) => {
    return await College.create(college);
  };

  //update college
  static addStudentsToCollegeById = async (collegeId, studentsId) => {
    return await College.findByIdAndUpdate(collegeId, {
      $push: { studentIds: studentsId },
    });
  };
  static findCollegeByIdAndUpdatePostList = async (collegeId, postId) => {
    try {
      return await College.findByIdAndUpdate(collegeId, {
        $push: { posts: postId },
      });
    } catch (error) {
      console.log(error);
    }
  };
  static searchCollegeUsingName = async (searchKey) => {
    return await College.fuzzySearch(searchKey);
  };

  //college information
}

module.exports = CollegeModels;
