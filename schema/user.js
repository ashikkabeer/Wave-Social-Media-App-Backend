const { boolean, string } = require('joi');
const { Schema, model } = require('mongoose');

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
  collegeId: {
    type: Schema.Types.ObjectId,
    ref: 'colleges',
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
  },
  coverPhoto: {
    type: String,
  },
  bio: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['administrator', 'user'],
    default: 'user',
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
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

const User = model('User', userSchema);

module.exports = {
  User,
};
