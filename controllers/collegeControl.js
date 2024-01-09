const College = require('../model/college');
const Post = require('../model/post')

const { User } = require('../model/user');
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
    let permission = false;
    const role = 'user';
    if (role === 'admin') {
      permission = true;
    }
    // edit this to check the role of the user
    res.render('addColleges', { permission });
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
        const { id, name, username, profilePhoto,posts } = student;
        await this.getCollegePosts(posts);
        students.push({ id, name, username, profilePhoto,posts });
      }
    }
    return students;
  };

  //completely change this function. add a schema to get the post id 
  // to college db. each college have a list
  getCollegePosts = async (postIds) => {
    console.log('In the getCollegePosts function');
    const posts = []
    for (const postId of postIds) {
      const post = await Post.findById(postId);
      if(post) {
        const {title, content, images, authorId, authorUsername} = post
        console.log(title, content, images, authorId, authorUsername)
        posts.push({title, content, images, authorId, authorUsername})
      }
    }
    return posts
  }
  collegeInfo = async (req, res) => {
    const collegeId = req.params.collegeId;
    console.log(collegeId);
    let college = await College.findById(collegeId);

    if (!college) {
      throw new Error('College not found');
    }
    let { Collegename, location, establishedYear, studentIds } = college;
    college = { Collegename, location, establishedYear };
    console.log(studentIds);
    const students = await this.findStudents(studentIds);
    console.log(college, students)
    
    await res.render('collegeProfile', { college, students, loggedIn: true });
  };
}

module.exports = new CollegeControls();
