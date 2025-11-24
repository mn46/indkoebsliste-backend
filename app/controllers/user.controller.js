const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

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

  const userExists = await User.findOne({
    where: { userName },
  });

  if (userExists) {
    return res.status(400).send("User name is already taken.");
  }

  const hashedPassword = await bcrypt.hash(req.body.userPassword, 15);

  const user = {
    userName: req.body.userName,
    userPassword: hashedPassword,
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
