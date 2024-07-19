const express = require("express");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/users.models");
const jwt = require("jsonwebtoken");
const { auth } = require("../middlewares/users.middleware");
const { BlackListModel } = require("../models/blacklist");

const userRouter = express.Router();

//give all user list
// Access: admin
// EndPoint: /users/;
// FRONTEND: when user/admin/teacher want to register in site;

userRouter.get("/", auth, async (req, res) => {
  try {
    if (req.body.role == "admin") {
      let users = await await UserModel.find();
      res.status(200).json({ users });
    } else {
      res.status(401).json({ error: "you don't have access to users" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "something went wrong", error: err.message });
  }
});

// userRouter.get("/", auth, async (req, res) => {
//   try {
//     if (req.user.role === "admin") { // Assuming role is stored in req.user
//       const { page, limit } = req.query;
//       const pageNumber = parseInt(page, 10) || 1; // Convert to integer with a default value of 1
//       const limitNumber = parseInt(limit, 10) || 10; // Convert to integer with a default value of 10
      
//       // Use pageNumber and limitNumber in your database query or pagination logic
//       const users = await UserModel.find()
//         .skip((pageNumber - 1) * limitNumber)
//         .limit(limitNumber);
      
//       res.status(200).json({ users });
//     } else {
//       res.status(401).json({ error: "You don't have access to users" });
//     }
//   } catch (err) {
//     console.error('error');
//     res.status(500).json({ message: "Something went wrong", error: err.message });
//   }
// });

//registration
// Access: all
// EndPoint: /user/register;
// FRONTEND: when user/admin/teacher want to register in site;

userRouter.post("/register", async (req, res) => {
  const { name, email, password, age, city, job, image, role } = req.body;
  
  try {
    const registeredUser = await UserModel.findOne({ email });

    if (registeredUser) {
      return res.status(409).json({ msg: "User already exists. Please Login!" });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      const newUser = new UserModel({
        name,
        email,
        password: hash,
        age,
        city,
        job,
        image,
        role: role || 'user', // Set role to 'user' if not provided in the request body
      });

      await newUser.save();

      res.status(201).json({ msg: "User created successfully", user: newUser });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// login for users;
// Access: All;
// EndPoint: /users/login;
// FRONTEND: when Admin/user/teacher want to login

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User does not exist. Sign up first!" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user._id, user: user.name, role: user.role }, // Include role in JWT payload
        "SV", // Replace with your actual secret key
        { expiresIn: "7d" }
      );

      const rToken = jwt.sign(
        { userId: user._id, user: user.name },
        "SV", // Replace with your actual refresh token secret key
        { expiresIn: "24d" }
      );

      res.status(202).json({ msg: "User Login Success", token, rToken, user });
    });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});
//updation
// Access: All
// EndPoint: /users/update/:userId;
// FRONTEND: when user want to update his information;
userRouter.patch("/update/:userId", async (req, res) => {
  const { userId } = req.params;
  const payload = req.body;

  try {
    let insertpayload;
    if (!payload?.password) {
      delete payload.password;
      await UserModel.findByIdAndUpdate({ _id: userId }, payload);
      const user = await UserModel.findOne({ _id: userId });
      res.status(200).json({ msg: "user updated successfully", user });
      return;
    }
    bcrypt.hash(payload.password, 2, async (err, hash) => {
      // Store hash in your password DB.
      if (err) {
        res.status(404).json({ msg: err });
      } else {
        // console.log(hash);
        insertpayload = await { ...payload, password: hash };
      }
      await UserModel.findByIdAndUpdate({ _id: userId }, insertpayload);
      const user = await UserModel.find({ _id: userId });
      res.status(200).json({ msg: "user updated successfully", user });
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

//delete the user ;
// Access: Admin
// EndPoint: /users/delete/:userId;
// FRONTEND: when admin want to delete user/teacher
userRouter.delete("/delete/:userId", auth, async (req, res) => {
  try {
    if (req.body.role == "admin") {
      const { userId } = req.params;
      const deletedUser = await UserModel.find({ _id: userId });
      await UserModel.findByIdAndDelete({ _id: userId });
      res
        .status(200)
        .json({ msg: "user has been deleted", deletedUser: deletedUser });
    } else {
      res.status(401).json({ error: "you don't have access to delete users" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

//logout
// Access: All
// EndPoint: /users/logout
// FRONTEND: when users want to logout
userRouter.post("/logout", (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const newToken = BlackListModel({ token });
    newToken.save();
    res.status(200).json({ msg: "The user has logged out" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// list to courses user purchased
// Access: All
// EndPoint: /users/userCourse/:userId
// FRONTEND: When user want to see his purchased courses

userRouter.get("/userCourse/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById({ _id: userId }).populate("course");
    // console.log(user.course, userId);
    res.status(200).json({ course: user.course });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Something Went Wrong", error: err.message });
  }
});

// add courseId to the user course array;
// Access: All
// EndPoint: /users/addCourse/:courseId
// FRONTEND: When user have purchased the couse and we have add it to the user course list;

userRouter.post("/addCourse/:courseId", auth, async (req, res) => {
  try {
    let id = req.body.userId;
    const courseId = req.params.courseId;
    // check is that course is already present or not;
    await UserModel.findOne({ _id: id, course: { $in: [courseId] } })
      .then(async (course) => {
        //console.log(course);
        if (course) {
          res
            .status(400)
            .json({ error: "You already have Suscribed the Course" });
        } else {
          let user = await UserModel.findByIdAndUpdate(id, {
            $push: { course: courseId },
          });
          res
            .status(201)
            .json({ message: "You have Suscribe the Course", user });
        }
      })
      .catch((error) => {
        console.error("Error checking course:", error);
      });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Something Went Wrong", error: err.message });
  }

});



userRouter.get("/Teachme/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID
    const user = await UserModel.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's role to "teacher"
    user.role = "teacher";
    await user.save();

    // Return success message
    res.status(200).json({ message: "User role updated to teacher" });
  } catch (err) {
    // Handle errors
    res.status(400).json({ message: "Something went wrong", error: err.message });
  }
});

// Password reset request
userRouter.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User with this email does not exist" });
    }

    const token = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: user.email,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
      http://localhost:000/reset-password/${token}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: "Password reset email sent" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Password reset
userRouter.post("/reset-password/:token", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Password reset token is invalid or has expired" });
    }

    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ msg: "Password is required" });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      user.password = hash;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      res.status(200).json({ msg: "Password has been reset successfully" });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  userRouter,
};
