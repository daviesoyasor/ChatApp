const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  email: {
    type: String,
    required: [true, 'must provide email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6
  },
  profilePicture: {
    type: String,
    default: "",
  },
  friends: {
    type: Array,
    default: [],
  },  
},

{ timestamps:true }

)

module.exports = mongoose.model('User', UserSchema)