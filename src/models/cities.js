import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  },
  insee_code: {
    type: String,
    required: true
  },
  zip_code: {
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
  },
  gps_lat: {
    type: Number,
    required: true
  },
  gps_lng: {
    type: Number,
    required: true
  }
});

export default mongoose.model('City', schema);
