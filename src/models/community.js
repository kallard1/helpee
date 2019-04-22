import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 75,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    is_enabled: {
      type: Boolean,
      default: true
    },
    zip_code: {
      type: String,
      required: true,
      maxlength: 5,
      trim: true
    },
    city: {
      type: String,
      required: true,
      maxlength: 75,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

schema.virtual('ad', {
  ref: 'Ad',
  localField: '_id',
  foreignField: 'community'
});

const Community = mongoose.model('Community', schema);

module.exports = Community;
