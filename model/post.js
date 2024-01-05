const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const College = require('./college');
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  images: {
    type: String,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  authorUsername: {
    type: String,
    required: true,
  },
  authorCollegeId: {
    type: Schema.Types.ObjectId,
    ref: 'College',
    required: true,
  },
  authorCollegeName: {
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
postSchema.plugin(mongoosePaginate);
const Post = model('Post', postSchema);
module.exports = Post;
