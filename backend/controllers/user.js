const User = require("../models/user");

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.create = async (req, res) => {
  const { UserName, Email, Password } = req.body;

  const oldUser = await User.findOne({ Email });

  if (oldUser) return sendError(res, "This email is already in use!");

  const newUser = new User({
    name: UserName,
    email: Email,
    password: Password,
  });
  try
  {
    await newUser.save();
  }
  catch (error)
  {
    res.status(500).json("Error when inserting user");
  }  

  res.status(201).json({
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  });
};

exports.signIn = async (req, res) => {
  const { UserName: email, Password: password } = req.body;
  console.log(email, password);

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "Email mismatch!");

  const matched = await user.comparePassword(password);
  if (!matched) return sendError(res, "Password mismatch!");

  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  const { _id, name, role, isVerified } = user;

  res.json({
    user: { id: _id, name, email, role, isVerified, token: jwtToken },
  });
};

function sendError(res, error, statusCode = 401) {
  res.status(statusCode).json({ error });
}
