const mongoose  = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  phone:{
    type:Number,
    required:true
  },
  profileImg:{
    type:String,
  },
  isActive:{
    type:Boolean,
    default:true
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  refreshToken: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

  UserSchema.pre('save',(next)=>{
    this.updatedAt = Date.now();
    next()
  })

module.exports= mongoose.model('User',UserSchema)