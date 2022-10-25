"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.UserRoles.hasMany(models.Users, {
        foreignKey: "role_id",
      });
    }
  }
  UserRoles.init(
    {
      user_as: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserRoles",
    }
  );
  return UserRoles;
};
