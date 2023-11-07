const { updateStudents } = require("./collegeControl");
const { updateUserPost } = require("./userControl");
const { Post, User } = require("../schema/user");
const College = require("../schema/college");

const CreatePosts = async (tweetData) => {
  try {
    const data = await Post.create(tweetData);
    await updateUserPost(data.author, data._id);
    return data;
  } catch (error) {
    console.error('Error creating a post:', error);
    throw error;
  }
};

const getAllPosts = async () => {
  try {
    // const posts = await Post.find({});
    const posts = await Post.find({}).exec();
    const formattedPosts = await Promise.all(
      posts.map(async (post) => {
        const author = await User.findById(post.author).exec();
        if (!author) {
          console.log("Author not found for post:", post._id);
          return null; // Skip this post and continue with the next one
        }

        const collegeName = await College.findById(author.collegeName).exec();
        if (!collegeName) {
          console.log("College not found for author:", author._id);
          return null; // Skip this post and continue with the next one
        }
        return {
          title: post.title,
          content: post.content,
          image: post.images,
          author: author ? author.username : "Unknown",
          college: collegeName ? collegeName.Collegename : "Unknown",
          upvotes: post.upvotes,
          views: post.views,
          date: post.createdAt,
        };
      })
    );

    // Filter out null values (posts with missing authors)
    const filteredPosts = formattedPosts.filter((post) => post !== null);
    console.log(filteredPosts)
    return filteredPosts;
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = {
  getAllPosts,
  CreatePosts,
};
