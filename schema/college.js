const { Schema, model } = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const collegeSchema = new Schema({
  Collegename: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  establishedYear: {
    type: Number,
    required: true,
  },
  studentIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
  ],
  postIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],

  ratings: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      rating: {
        type: Number,
        default: 0,
      },
      review: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// Create the College model
collegeSchema.plugin(mongoose_fuzzy_searching, { fields: ['firstName', 'lastName'] });
const College = model('College', collegeSchema);
module.exports = College;
