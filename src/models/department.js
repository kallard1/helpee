import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Region'
  },
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Department', schema);
