import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdCategory'
    },
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 150,
      index: {
        unique: true,
        dropDups: true
      }
    },
    slug: {
      type: String,
      slug: 'title',
      trim: true,
      maxlength: 255,
      unique: true
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
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Community'
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City'
    },
    images: [String]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Ad', schema);
