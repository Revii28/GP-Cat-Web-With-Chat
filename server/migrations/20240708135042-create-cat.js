"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      breed: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      age: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      adoptionStatus: {
        type: Sequelize.STRING,
        allowNull: false,
        default: "Available",
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contact: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Cats");
  },
};
