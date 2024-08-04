"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cat.belongsTo(models.User);
      Cat.hasMany(models.CatImage);
    }
  }
  Cat.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "name is required" },
          notNull: { msg: "name is required" },
        },
      },
      breed: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "breed is required" },
          notNull: { msg: "breed is required" },
        },
      },
      age: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "age is required" },
          notNull: { msg: "age is required" },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "gender is required" },
          notNull: { msg: "gender is required" },
        },
      },
      adoptionStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Available",
        validate: {
          notEmpty: { msg: "adoption status is required" },
          notNull: { msg: "adoption status is required" },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "description is required" },
          notNull: { msg: "description is required" },
        },
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "contact is required" },
          notNull: { msg: "contact is required" },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "user id is required" },
          notNull: { msg: "user id is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Cat",
    }
  );
  return Cat;
};
