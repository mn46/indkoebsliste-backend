module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userPassword: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userRole: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return User;
};
