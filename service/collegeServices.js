const PostModels = require('../models/postModels')
const CollegeModels = require('../models/collegeModels')
const userModels  = require('../models/userModels');
class collegeServices {
  static getAllCollege = async () => {
    const colleges = await CollegeModels.getAllCollege();
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

  static getCollegeById = async (collegeId) => {
    try {
      console.log(collegeId);
      const college = await CollegeModels.getCollegeById(collegeId)
      if (college) {
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
  static addCollegeService = async (college) => {
    const response = await CollegeModels.createCollege(college)
    return response;
  };

  static updateColleges = async (collegeId, studentsId) => {
    const update = await CollegeModels.addStudentsToCollegeById(collegeId, studentsId)
    if (!update) {
      const error = new Error('Failed to update students: ');
      error.stack = 404;
      throw error;
    }
  };
  static findStudents = async (studentIds) => {
    console.log('in the findStudents' + typeof studentIds);
    const students = [];
    for (const studentId of studentIds) {
      const student = await userModels.findUserbyId(studentId)
      if (student) {
        const { id, name, username, posts } = student;
        await this.getCollegePosts(posts);
        students.push({ id, name, username, posts });
      }
    }
    return students;
  };
  static getCollegePosts = async (postIds) => {
    console.log('In the getCollegePosts function');
    const posts = [];
    for (const postId of postIds) {
      const post = await PostModels.getPostById(postId)
      if (post) {
        const { title, content, images, authorId, authorUsername } = post;
        console.log(title, content, images, authorId, authorUsername);
        posts.push({ title, content, images, authorId, authorUsername });
      }
    }
    return posts;
  };

  static collegeInfoService = async (collegeId) => {
    let college = await CollegeModels.getCollegeById(collegeId);
    if (!college) {
      throw new Error('College not found');
    }
    console.log(college)
    let { Collegename, location, establishedYear, postIds } = college;
    college = { Collegename, location, establishedYear };
    let posts = await this.getCollegePosts(postIds);
    console.log(posts)
    return { college, posts };
  };
  static updatePostIdsInCollegeDB = async (collegeId, postId) => {
    return await CollegeModels.findCollegeByIdAndUpdatePostList(collegeId, postId)
  }


  static searchCollegeUsingName = async (searchKey) => {
    return await CollegeModels.searchCollegeUsingName(searchKey)
  }
}

module.exports = collegeServices;
