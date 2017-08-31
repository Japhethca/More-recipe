'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      descriptions: {
        type: Sequelize.TEXT
      },
      ingredients: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      directions: {
        type: Sequelize.TEXT
      },
      photos: {
        type: Sequelize.BLOB
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      usersId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'usersId',
        }
      },
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Recipes');
  }
};