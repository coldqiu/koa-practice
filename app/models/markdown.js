const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const markdownSchema = new Schema({
  __v: { type: Number, select: false },
  content: { type: String }
})

module.exports = model('Markdown', markdownSchema);
