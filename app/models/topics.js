const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const topicSchema = new Schema({
  __v: { type: Number, select: false }, // 隐藏__v这个字段
  name: { type: String, required: true },
  avatar_url: { type: String },
  introduction: { type: String, select: false },

});

module.exports = model('Topic', topicSchema);
