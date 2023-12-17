var express = require("express");
var router = express.Router();
const { CreatePosts, getAllPosts } = require("../controllers/postControl");
const uploadImagetoCloud = require("../controllers/imageUpload");
const { MongoError } = require("mongodb");
const Multer = require("multer");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
});
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    // User is authenticated, proceed to the next middleware or route handler
    return next();
  }
  res.redirect("/login");
}

router.post("/post", isAuthenticated, multer.single("image"), async (req, res,next) => {
  try {
    if (!req.session || !req.session.user || !req.session.user._id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    if (!req.body.title || !req.body.content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    let tweetData = {
      title: req.body.title,
      content: req.body.content,
      author: req.session.user._id,
    };

    if (req.file) {
      const imageUrl = await uploadImagetoCloud(req.file.buffer);
      tweetData.images = imageUrl;
    }
    const response = await CreatePosts(tweetData);
    return res.status(201).json({ message: 'Operation successful', data: response });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const data = await getAllPosts();
    res.render('index', { data });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.sendStatus(500).send('An error occurred while fetching posts.');
  }
});


router.get('/post', isAuthenticated, async (req, res, next) => {
  try {
    res.render('addPost');
  } catch (error) {
    console.error('Error rendering "addPost" view:', error);
    res.sendStatus(500).send('An error occurred while rendering the "addPost" view.');
  }
});
router.get('/profile-pic', (req, res) => {
  try {
    res.render('imageUpload');
  } catch (error) {
    console.error('Error rendering "imageUpload" view:', error);
    res.sendStatus(500).send('An error occurred while rendering the "imageUpload" view.');
  }
});

router.get('/upload', async (req, res) => {
  try {
    const files = await getBucketFiles(); // Replace with your actual controller function
    res.json(files);
  } catch (error) {
    console.error('Error listing files:', error);
    res.sendStatus(500).json({ error: 'An error occurred while listing files' });
  }
});

module.exports = router;
