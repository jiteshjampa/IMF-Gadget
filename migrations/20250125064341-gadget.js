"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Gadgets", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4, // Updated to UUIDV4 instead of UUID4
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(
          "Available",
          "Deployed",
          "Destroyed",
          "Decommissioned"
        ),
        defaultValue: "Available",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"), // Automatically set to the current time
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"), // Automatically set to the current time
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Gadgets");
  },
};
