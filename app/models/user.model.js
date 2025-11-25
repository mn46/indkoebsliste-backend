module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    userName: {
      type: Sequelize.STRING,
    },
    userPassword: {
      type: Sequelize.STRING,
    },
    userRole: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
