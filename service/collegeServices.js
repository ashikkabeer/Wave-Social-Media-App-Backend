const College = require('../model/college');
const Post = require('../model/post');
const { User } = require('../model/user');
class collegeServices {
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
  addCollegeService = async (college) => {
    const response = await College.create(college);
    return response;
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
  findStudents = async (studentIds) => {
    console.log('in the findStudents' + typeof studentIds);
    const students = [];
    for (const studentId of studentIds) {
      const student = await User.findById(studentId);
      if (student) {
        const { id, name, username, profilePhoto, posts } = student;
        await this.getCollegePosts(posts);
        students.push({ id, name, username, profilePhoto, posts });
      }
    }
    return students;
  };
  getCollegePosts = async (postIds) => {
    console.log('In the getCollegePosts function');
    const posts = [];
    for (const postId of postIds) {
      const post = await Post.findById(postId);
      if (post) {
        const { title, content, images, authorId, authorUsername } = post;
        console.log(title, content, images, authorId, authorUsername);
        posts.push({ title, content, images, authorId, authorUsername });
      }
    }
    return posts;
  };

  collegeInfoService = async (collegeId) => {
    let college = await College.findById(collegeId);
    if (!college) {
      throw new Error('College not found');
    }
    let { Collegename, location, establishedYear, studentIds } = college;
    college = { Collegename, location, establishedYear };
    const students = await this.findStudents(studentIds);
    return { college, students };
  };
}

module.exports = new collegeServices();
