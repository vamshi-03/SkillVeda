const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    age: Number,
    city: String,
    job: String,
    course: [{ type: mongoose.Schema.Types.ObjectId, ref: 'course' }],
    role: { type: String, enum: ['user', 'student', 'teacher', 'admin'], default: 'user' },
    image: String,
    isPromotion: Boolean,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    versionKey: false,
  }
);


const User = mongoose.model('User', userSchema);

module.exports = User;


//model
const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
