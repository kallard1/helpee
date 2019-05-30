import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);

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
      slug: 'name',
      maxlength: 100,
      trim: true,
      unique: true
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
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City'
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
