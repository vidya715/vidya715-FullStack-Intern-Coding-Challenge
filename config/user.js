const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 60],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 16],
      is: /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/, // At least one uppercase and one special char
    },
  },
  address: {
    type: DataTypes.STRING,
    validate: {
      len: [0, 400],
    },
  },
  role: {
    type: DataTypes.ENUM('admin', 'normal', 'owner'),
    allowNull: false,
    defaultValue: 'normal',
  },
  storeId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Stores',
      key: 'id',
    },
    onDelete: 'SET NULL',
  },
});

module.exports = User;
