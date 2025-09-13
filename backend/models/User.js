import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
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
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    default: "student",
  },
  region: {
    type: String,
    required:true
  },
});

//hasing the pass before save..
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.passwod = await bcrypt.hash(this.password,10);
    next();
})

const User = mongoose.model('User',userSchema);
export default User;