const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// create a new user
exports.create = (req, res) => {
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

  const user = {
    userName: req.body.userName,
    userPassword: req.body.userPassword,
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
