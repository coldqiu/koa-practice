const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  __v: { type: Number, select: false },
  name: { type: String, required: true },
  password: { type: String, require: true, select: false },
  avatar_url: { type: String },
  gender: { type: String, enum: ['male', 'female'], default: 'male', required: true}, // enum代表可以枚举
  headline: { type: String },
  locations: { type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }], select: false},
  business: { type: Schema.ObjectId, ref: 'Topic', select: false},
  employments: { type: [{
      company: { type: Schema.ObjectId, ref: 'Topic' },
      job: { type: Schema.ObjectId, ref: 'Topic' }
    }],
    select: false
  },
  educations: {
    type: [{
      school: { type: Schema.ObjectId, ref: 'Topic' },
      major: { type: Schema.ObjectId, ref: 'Topic' },
      diploma: { type: Number },
      entrance_year: { type: Number },
      graduation_year: { type: Number }
    }], select: false
  },
  following: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    select: false
  },
  followingTopics: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Topic'}],
    select: false
  }
});

module.exports = model('User', userSchema);
