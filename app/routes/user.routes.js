module.exports = (app) => {
  const userController = require("../controllers/user.controller");

  let router = require("express").Router();

  // create a user
  router.post("/sign-up", userController.create);

  // sign in user
  router.post("/sign-in", userController.signIn);

  app.use("/api/users", router);
};
