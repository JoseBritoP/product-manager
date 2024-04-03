import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from "sequelize";

const { DATABASE_URI } = process.env;

export const db = new Sequelize(`${DATABASE_URI}`,{
  dialect:`postgres`
  
});

export async function connectDB(){
  try {
    await db.authenticate();
    db.sync({force:true})
    console.log(`Connection successfully to Database`)
  } catch (error:any) {
    console.log(error)
    console.log('Error db connection')
  }
}
