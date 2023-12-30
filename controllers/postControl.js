const { updateUserPost } = require('./userControl');
const { User } = require('../model/user');
let UserControls = require('./userControl');
const Post = require('../model/post');
const { v4: uuidv4 } = require('uuid');
const Multer = require('multer');
const { Storage } = require('@google-cloud/storage');

UserControls = new UserControls();

class PostControls {
  constructor() {
    this.create = this.create.bind(this);
    this.retrieveAll = this.retrieveAll.bind(this);
    this.renderUploadForm = this.renderUploadForm.bind(this);
    this.uploadImagetoCloud = this.uploadImagetoCloud.bind(this);
    this.renderProfilePhotoForm = this.renderProfilePhotoForm.bind(this);
  }
  async renderUploadForm(req, res) {
    res.render('addPost');
  }
  async create(req, res) {
    if (!req.session || !req.session.user || !req.session.user._id) {
      throw new Error('user not authenticated');
    }
    if (!req.body.title || !req.body.content) {
      throw new Error('Title and content are required');
    }
    const authorId = req.session.user._id;
    const author = await User.findById(authorId);
    let data = {
      title: req.body.title,
      content: req.body.content,
      author: req.session.user._id,
      authorName: author.username,
      authorCollege: author.collegeName,
    };
    if (req.file) {
      console.log('image found');
      const imageUrl = await this.uploadImagetoCloud(req.file.buffer);

      data.images = imageUrl;
    }
    const post = await Post.create(data);
    await UserControls.updatePostList(post.author, post._id);
    return res.status(200).redirect('/');
  }

  async renderProfilePhotoForm(req, res) {
    res.render('imageUpload');
  }
  // add the user data in the post schema
  async retrieveAll(req, res) {
    const posts = await Post.find({}).exec();
    if (!posts) {
      throw new Error('Unable to retrieve data');
    }
    const formattedPosts = await Promise.all(
      posts.map(async (post) => {
        return {
          title: post.title,
          content: post.content,
          image: post.images,
          author: post.author,
          authorName: post.authorName,
          authorCollege: post.authorCollege,
          upvotes: post.upvotes,
          views: post.views,
          date: post.createdAt,
        };
      })
    );
    const data = formattedPosts.filter((post) => post !== null);
    res.render('index', { data });
  }
  async uploadImagetoCloud(buffer) {
    console.log('uploading');
    const multer = Multer({
      storage: Multer.memoryStorage(),
      limits: {
        fileSize: 1024 * 1024 * 5, // 5 MB
      },
    });

    let projectId = 'fit-legacy-399206';
    let keyFilename = 'mykeys.json';

    const storage = new Storage({
      projectId,
      keyFilename,
    });

    const bucket = storage.bucket('wave_first_project');
    return new Promise((resolve, reject) => {
      const filename = uuidv4() + '_post.jpg';
      console.log('file found... trying to upload', filename);
      const blob = bucket.file(filename); // storing by uuidv4()
      const blobStream = blob.createWriteStream();
      blobStream.on('error', (error) => {
        console.error('Error while uploading image:', error);
        reject(error);
      });
      blobStream.on('finish', () => {
        const imageUrl = `https://storage.cloud.google.com/wave_first_project/${filename}`;
        console.log('Image uploaded successfully:', imageUrl);
        resolve(imageUrl);
      });
      blobStream.end(buffer);
      console.log('image uploaded and ended');
    });
  }
}

module.exports = PostControls;
