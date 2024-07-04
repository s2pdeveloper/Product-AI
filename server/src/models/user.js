const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/JwtOptions');

// const { usersRoles, defaultStatus } = OPTIONS;

const UserSchema = mongoose.Schema(
  {
    isDelete: {
      type: Boolean,
      required: false,
      default: 0,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: false,
    },
  
    role: {
      type: String,
      required: true,
      enum: ["ADMIN","SUPERADMIN","USER"],
      default:"USER"

    },
    resetPasswordOTP: {
      type: String,
      default:null
    },
  },
  
  {
    collection: 'User',
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
  }  
);

UserSchema.index({ '$**': 'text' });

// Virtual for user's full name
UserSchema.virtual('fullName').get(function () {
  return `${this.firstName ?? ''} ${this.lastName ?? ''}`;
});

UserSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

UserSchema.methods.genToken = function () {
  const payload = { id: this._id };
  return jwt.sign(payload, jwtOptions.secretOrKey, {
    expiresIn: jwtOptions.expiry,
  });
};
UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(8));
  }
  next();
});

const  User = mongoose.model('User', UserSchema);

module.exports = User;
