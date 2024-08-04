"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recipient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recipient.belongsTo(models.User);
      Recipient.hasMany(models.ChatMessage);
    }
  }
  Recipient.init(
    {
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Recipient",
    }
  );
  return Recipient;
};
