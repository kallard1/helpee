import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      unique: false,
      required: true,
      maxlength: 25,
      trim: true
    },
    lastname: {
      type: String,
      unique: false,
      required: true,
      maxlength: 50,
      trim: true
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
      unique: true,
      trim: true
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
      type: String,
      default: 'ROLE_USER',
      required: false
    },
    loggued_at: {
      type: Date,
      required: false
    },

    informations: {
      description: {
        type: String,
        required: false,
        trim: true
      },
      uev: {
        type: Number,
        required: true,
        default: 0
      },
      address: {
        type: String,
        required: false,
        maxlength: 75,
        trim: true
      },
      address1: {
        type: String,
        required: false,
        maxlength: 75,
        trim: true
      },
      zip_code: {
        type: String,
        required: false,
        maxlength: 5,
        trim: true
      },
      city: {
        type: String,
        require: false,
        trim: true
      },
      phone: {
        type: String,
        required: false,
        maxlength: 12,
        trim: true
      }
    }
  },
  {
    timestamps: true
  }
);

schema.virtual('community_user', {
  ref: 'Community',
  localField: '_id',
  foreignField: 'user'
});

schema.virtual('community_members', {
  ref: 'Community',
  localField: '_id',
  foreignField: 'members'
});

schema.virtual('ad_user', {
  ref: 'Ad',
  localField: '_id',
  foreignField: 'user'
});

// eslint-disable-next-line func-names
schema.pre('save', function(next) {
  const self = this;

  if (!self.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(self.password, salt, (error, hash) => {
      if (error) return next(error);

      self.password = hash;
      next();
    });
  });
});

schema.methods.comparePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => cb(err, isMatch));
};

module.exports = mongoose.model('User', schema);
