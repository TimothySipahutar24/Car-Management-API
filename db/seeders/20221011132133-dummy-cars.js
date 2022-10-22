"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Cars", [
      {
        carName: "Innova",
        rent: 150000,
        carImage:
          "https://res.cloudinary.com/dcod6a8ys/image/upload/v1665673468/challenge-chp-05/urdzlyfw7rpmfv46wlcd.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        carName: "Veloz",
        rent: 200000,
        carImage:
          "https://res.cloudinary.com/dcod6a8ys/image/upload/v1665651377/challenge-chp-05/jqmrsaytdv6zokujxsgt.png",
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
