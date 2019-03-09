import mongoose from "mongoose";

export type UserModel = mongoose.Document & {
  firstname: string,
  lastname: string,
  password: string,
  email: string,

  is_verified: boolean,
  verification_token: string,

  is_enabled: boolean,
  is_banned: boolean,

  role: [],

  loggued_at: Date,
};

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      unique: false,
      required: true,
      maxlength: 25,
    },
    lastname: {
      type: String,
      unique: false,
      required: true,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    is_verified: {
      type: Boolean,
      default: false,
      required: false,
    },
    verification_token: {
      type: String,
      required: false,
    },
    is_enabled: {
      type: Boolean,
      default: true,
      required: false,
    },
    is_banned: {
      type: Boolean,
      default: false,
      required: false,
    },
    role: {
      type: Array,
      default: ["ROLE_USER"],
      required: false,
    },
    loggued_at: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  });

userSchema.statics.findByEmail = async function (email: string) {
  return await this.findOne({ email });
};

userSchema.pre("remove", function (next) {
  this.model("informationsUser").deleteOne({ user: this._id }, next);
  mongoose.connection.close();
});

export default mongoose.model("User", userSchema);
