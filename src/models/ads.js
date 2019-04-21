import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.User.ObjectId,
      ref: 'User'
    },
    category: {},
    title: {
      type: String,
      required: true,
      maxlength: 150,
      index: {
        unique: true,
        dropDups: true
      }
    },
    slug: {
      type: String,
      required: true,
      maxlength: 255,
      index: {
        unique: true,
        dropDups: true
      }
    },
    description: {
      type: String,
      required: true
    },
    is_enabled: {
      type: Boolean,
      default: true
    },
    uev: {
      type: Number,
      required: true
    },
    community: {}
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Ad', schema);
