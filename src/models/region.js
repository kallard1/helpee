import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    maxlength: 2
  },
  name: {
    type: String,
    required: true,
    maxlength: 30
  },
  slug: {
    type: String,
    required: true,
    maxlength: 50
  }
});

module.exports = mongoose.model('Region', schema);
