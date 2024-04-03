import dotenv from 'dotenv';
import app from "./app";
import { connectDB } from "./config/db";

dotenv.config();

app.listen(3000,()=>{
  connectDB();
  console.log(`Server on port ${3000}`)
})