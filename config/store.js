const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Store = sequelize.define('Store', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },
  address: {
    type: DataTypes.STRING,
    validate: {
      len: [0, 400],
    },
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    defaultValue: 0.0,
  },
});

module.exports = Store;
