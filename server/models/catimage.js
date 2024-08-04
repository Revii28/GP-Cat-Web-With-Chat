"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CatImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CatImage.belongsTo(models.Cat);
    }
  }
  CatImage.init(
    {
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "image is required" },
          notNull: { msg: "image is required" },
        },
      },
      CatId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CatImage",
    }
  );
  return CatImage;
};
