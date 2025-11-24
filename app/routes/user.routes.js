modulte.exports = (app) => {
  const userController = require("../controllers/user.controller");

  let router = require("express").Router();

  // create a user
  router.post("/", userController.create);
};
