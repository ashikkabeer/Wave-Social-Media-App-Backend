const { Schema, model } = require("mongoose");
//checking the changes
//Schema for the user
const userSchema = new Schema({
  name: {
    type: String,
    // required: true,
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



const User = model("User", userSchema);

module.exports = {
  User,
};
