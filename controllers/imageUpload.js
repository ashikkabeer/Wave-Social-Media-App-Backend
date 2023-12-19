




const uploadImagetoCloud = async (buffer) => {
  return new Promise((resolve, reject) => {
    const filename = uuidv4() + "_post.jpg";
    console.log("file found... trying to upload", filename);
    const blob = bucket.file(filename); // storing by uuidv4()
    const blobStream = blob.createWriteStream();
    blobStream.on('error', (error) => {
      console.error('Error while uploading image:', error);
      reject(error);
    });
    blobStream.on("finish", () => {
      const imageUrl = `https://storage.cloud.google.com/wave_first_project/${filename}`;
      console.log('Image uploaded successfully:', imageUrl);
      resolve(imageUrl);
    });
    blobStream.end(buffer);
    console.log('image uploaded and ended')
  });
};

module.exports = uploadImagetoCloud