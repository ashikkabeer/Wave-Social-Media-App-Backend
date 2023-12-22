const { Schema, model } = require("mongoose");
//checking the changes
//Schema for the user
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  collegeName: {
    type: Schema.Types.ObjectId,
    ref: "colleges",
    required: true,
  },
  profilePhoto: {
    type : String
  }, // Store the URL of the profile photo
  coverPhoto: {
    type:String
  },
  bio: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User" 
    }
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  totalPosts: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Schemas for post
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  images:{
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  authorCollege: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Schema for the comment on the post
const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = model("Comment", commentSchema);
const Post = model("Post", postSchema);
const User = model("User", userSchema);

module.exports = {
  User,
  Post,
  Comment,
};
