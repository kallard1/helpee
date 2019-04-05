import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      unique: false,
      required: true,
      maxlength: 25
    },
    lastname: {
      type: String,
      unique: false,
      required: true,
      maxlength: 50
    },
    password: {
      type: String,
      required: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    email: {
      type: String,
      required: true,
      unique: true
    },
    is_verified: {
      type: Boolean,
      default: false,
      required: false
    },
    verification_token: {
      type: String,
      required: false
    },
    is_enabled: {
      type: Boolean,
      default: true,
      required: false
    },
    is_banned: {
      type: Boolean,
      default: false,
      required: false
    },
    role: {
      type: Array,
      default: ['ROLE_USER'],
      required: false
    },
    loggued_at: {
      type: Date,
      required: false
    },

    informations: {
      description: {
        type: String,
        required: false
      },
      uev: {
        type: Number,
        required: true,
        default: 0
      },
      address: {
        type: String,
        required: false,
        maxlength: 75
      },
      address1: {
        type: String,
        required: false,
        maxlength: 75
      },
      zip_code: {
        type: String,
        required: false,
        maxlength: 5
      },
      city: {
        type: String,
        require: false
      },
      phone: {
        type: String,
        required: false,
        maxlength: 12
      }
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', (next) => {
  const self = this;

  if (!self.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(self.password, salt, (err, hash) => {
      if (err) return next(err);

      self.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => cb(err, isMatch));
};

module.exports = mongoose.model('User', userSchema);
