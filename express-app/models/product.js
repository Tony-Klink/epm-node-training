import Sequelize from 'sequelize';
import { sequelize } from '../sequelize';


export const Product = sequelize.define('Product', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  reviews: Sequelize.STRING
}, {});
Product.associate = function (models) {
  // associations can be defined here
};