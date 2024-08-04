"use strict";
const { Model } = require("sequelize");
const { encrypt } = require("../helpers/bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cat);
      User.hasMany(models.Recipient);
      User.hasMany(models.ChatMessage);
    }
  }
  User.init(
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Username is required" },
          notNull: { msg: "Username is required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "This email is already in use",
        },
        allowNull: false,
        validate: {
          notEmpty: { msg: "Email is required" },
          notNull: { msg: "Email is required" },
          isEmail: { msg: "Please provide a valid email address" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password is required" },
          notNull: { msg: "Password is required" },
          len: {
            args: [6, Infinity],
            msg: "Password must be at least 6 characters",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((instance) => {
    instance.password = encrypt(instance.password);
  });

  return User;
};
