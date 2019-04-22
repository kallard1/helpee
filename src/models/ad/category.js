import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      maxlength: 75
    },
    slug: {
      type: String,
      required: true,
      maxlength: 75
    }
  },
  {
    timestamps: true,
    collection: 'ads_categories'
  }
);

schema.virtual('AdCategory', {
  ref: 'AdCategory',
  localField: '_id',
  foreignField: 'category'
});

module.exports = mongoose.model('AdCategory', schema);
