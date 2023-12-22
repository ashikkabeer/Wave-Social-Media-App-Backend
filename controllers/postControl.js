const { updateUserPost } = require('./userControl');
const { Post } = require('../schema/user');
const { v4: uuidv4 } = require('uuid');
const Multer = require('multer');
const { Storage } = require('@google-cloud/storage');

class PostControls {
  constructor() {
    this.create = this.create.bind(this);
    this.retrieveAll = this.retrieveAll.bind(this);
  }
  async renderUploadForm(req, res) {
    try {
      res.render('addPost');
    } catch (error) {
      console.error('Error rendering "addPost" view:', error);
      res.sendStatus(500).send('An error occurred while rendering the "addPost" view.');
    }
  }
  async create(req, res) {
    try {
      if (!req.session || !req.session.user || !req.session.user._id) {
        return res.status(401).json({ error: 'User not authenticated' });
      }
      if (!req.body.title || !req.body.content) {
        return res
          .status(400)
          .json({ error: 'Title and content are required' });
      }
      let data = {
        title: req.body.title,
        content: req.body.content,
        author: req.session.user._id,
      };
      if (req.file) {
        const imageUrl = await this.uploadImagetoCloud(req.file.buffer);
        data.images = imageUrl;
      }
      const post = await Post.create(data);
      await updateUserPost(post.author, post._id);
      return res
        .status(201)
        .json({ message: 'Operation successful', data: post });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async renderProfilePhotoForm(req, res) {
    try {
      res.render('imageUpload');
    } catch (error) {
      console.error('Error rendering "imageUpload" view:', error);
      res
        .sendStatus(500)
        .send('An error occurred while rendering the "imageUpload" view.');
    }
  }
  // add the user data in the post schema
  async retrieveAll(req, res) {
    try {
      const posts = await Post.find({}).exec();
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
    } catch (error) {
      console.error('Error:', error);
      res.sendStatus(500).send('An error occurred while fetching posts.');
    }
  }
  async uploadImagetoCloud(buffer) {
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
