require("dotenv").config();
const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.users;
const jwt = require("jsonwebtoken");

// create a new user
exports.create = async (req, res) => {
  if (!req.body.userName) {
    res.status(400).send({
      message: "User name can not be empty.",
    });
    return;
  }

  if (!req.body.userPassword) {
    res.status(400).send({
      message: "Password can not be empty.",
    });
    return;
  }

  const userName = req.body.userName;

  const userExists = await User.findOne({
    where: { userName },
  });

  if (userExists) {
    return res.status(400).send("User name is already taken.");
  }

  const hashedPassword = await bcrypt.hash(req.body.userPassword, 15);

  const user = {
    userName: userName,
    userPassword: hashedPassword,
    userRole: req.body.userRole || "reader",
  };

  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};

exports.signIn = async (req, res) => {
  const userName = req.body.userName;
  const userPassword = req.body.userPassword;

  const foundUser = await User.findOne({
    where: { userName },
  });

  if (!foundUser) {
    return res.status(404).json("User not found.");
  }

  const isPasswordValid = await bcrypt.compare(
    userPassword,
    foundUser.userPassword
  );

  if (!isPasswordValid) {
    return res.status(404).json("Incorrect password.");
  }

  // sign in user with the token
  const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET);

  res.cookie("token", token, { httpOnly: true });

  res.status(200).send({
    userId: foundUser.id,
    userName: foundUser.userName,
    userRole: foundUser.userRole,
    accessToken: token,
  });
};
