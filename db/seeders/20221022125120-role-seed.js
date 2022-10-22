"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("UserRoles", [
      {
        user_as: "Super Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_as: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_as: "Member",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
