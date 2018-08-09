const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')

const Schema = mongoose.Schema;
var roles = ["admin", "guest", "customer"]
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  image: String,
  role: {
    type: String,
    enum: ['Member', 'Client', 'Owner', 'Admin'],
    default: "guest",
  },
  token: String,
  updatedAt: Date,
});

UserSchema.methods.pre('save', async (next) => {
  var user = this
  if(!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if(err) return next(err)
    bcrypt.hash(user.password, salt, (err, hashedPassword) => {
      if(err) return next(err)
      user.password = hashedPassword
      return next(null, user)
    })
  })
})

UserSchema.methods.comparePasswords((password) => {
  var user = this
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if(err) throw new Error(err)
    return isMatch
  })
})

const Users = mongoose.model('user', UserSchema);

module.exports = { Users } 