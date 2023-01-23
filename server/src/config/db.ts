import mongoose from 'mongoose';
import { dev } from '.';

export const connectDB = async () => {
  try {
    await mongoose.connect(dev.db.url);
    console.log('database is connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

/*const mongoose = require("mongoose");
const { dev } = require(".");

export const connectDB = async() => {
    try {
        await mongoose.connect(dev.db.url);
        console.log("database is connected");
    }catch (error) {
        console.log("database is not connected")
        console.log(error);
        process.exit(1);
    }
}
*/