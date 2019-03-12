import bcrypt from "bcrypt";
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

  description: string,
  uev: number,
  address: string,
  address1: string,
  zip_code: string,
  city: string,
  phone: string,

  loggued_at: Date,

  comparePassword: (candidatePassword: string, cb: (err: Error, isMatch: boolean) => void) => void,
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
    resetPasswordToken: String,
    resetPasswordExpires: Date,
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

    informations: {
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
    },
  },
  {
    timestamps: true,
  });

userSchema.pre("save", (function (next) {
  const self: any = this;

  if (!self.isModified("password")) return next();
  bcrypt.genSalt(10, (function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(self.password, salt, (function (err, hash) {
      if (err) return next(err);

      self.password = hash;
      next();
    }));
  }));
}));

userSchema.methods.comparePassword = function (candidatePassword: string, cb: (err: Error, isMatch: boolean) => void) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    return cb(err, isMatch);
  });
};

export default mongoose.model<UserModel>("User", userSchema);
