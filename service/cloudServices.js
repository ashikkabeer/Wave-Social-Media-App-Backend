require('dotenv').config()
const { v4: uuidv4 } = require('uuid');
const { Storage } = require('@google-cloud/storage');

class CloudServices {
  static uploadImagetoCloudService = (buffer) => {
    let projectId = process.env.PROJECT_ID;
    let keyFilename = process.env.KEY_FILE;

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
  };
}

module.exports = new CloudServices()