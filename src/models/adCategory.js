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

const AdCategory = mongoose.model('AdCategory', schema);

module.exports = AdCategory;
