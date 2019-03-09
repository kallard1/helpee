import mongoose from "mongoose";

export type InformationsUserModel = mongoose.Document & {
  description: string,
  uev: number,
  address: string,
  address1: string,
  zip_code: string,
  city: string,
  phone: string,
  user: any,
};

const informationUserSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: false,
    },
    uev: {
      type: Number,
      required: true,
      default: 0,
    },
    address: {
      type: String,
      required: false,
      maxlength: 75,
    },
    address1: {
      type: String,
      required: false,
      maxlength: 75,
    },
    zip_code: {
      type: String,
      required: false,
      maxlength: 5,
    },
    city: {
      type: String,
      require: false,
    },
    phone: {
      type: String,
      required: false,
      maxlength: 12,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  });

export default mongoose.model("Informations_user", informationUserSchema);
