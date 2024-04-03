import 'dotenv/config';
import { Sequelize } from "sequelize-typescript";

// Models
import ProductModel from '../models/Product';

// Credentials
const DB_USER = <string>process.env.DB_USER;
const DB_PASSWORD = <string>process.env.DB_PASSWORD;
const DB_HOST =<string>process.env.DB_HOST;
const DB_NAME = <string>process.env.DB_NAME;
const DB_PORT = <string>process.env.DB_PORT;

// Instance

export const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, { logging: false });

// ConnectDB
export async function connectDB(){
  try {
    await sequelize.authenticate();
    sequelize.sync({force:true})
    console.log(`Connection successfully to Database`)
  } catch (error:any) {
    // console.log(error)
    console.log('Error db connection')
  }
}

// Models definition
ProductModel(sequelize);

// Destructuring models

export const { Product } = sequelize.models;

// Relations
