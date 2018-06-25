import Sequelize from 'sequelize';
import { sequelize } from '../sequelize';


export const User = sequelize.define('User', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
}, {});
User.associate = function (models) {
  // associations can be defined here
};