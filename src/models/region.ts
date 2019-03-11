import mongoose from "mongoose";

export type RegionModel = mongoose.Document & {
  // TODO
};

const regionSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    maxlength: 2,
  },
  name: {
    type: String,
    required: true,
    maxlength: 30,
  },
  slug: {
    type: String,
    required: true,
    maxlength: 50,
  },
});

export default mongoose.model("Region", regionSchema);
