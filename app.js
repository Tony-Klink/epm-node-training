import "babel-register";
import { name } from './config/config.json';
import { User, Product } from './modules'

console.log(`import config.json: ${name}`);
const user = new User();
const product = new Product();