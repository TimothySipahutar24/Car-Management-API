"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cars.init(
    {
      carName: DataTypes.STRING,
      rent: DataTypes.INTEGER,
      carImage: DataTypes.STRING,
      // createdBy: DataTypes.STRING,
      // updatedBy: DataTypes.STRING,
      // deletedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cars",
      paranoid: true,
    }
  );
  return Cars;
};