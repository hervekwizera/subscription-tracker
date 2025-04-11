import mongoose from "mongoose";
import {db_URI,NODE_ENV} from '../config/env.js';


if(!db_URI){
    throw new Error('please define the MONGODB_URI environment variable inside .env<development/production>.local');

}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(db_URI);
        console.log(`connected to database in ${NODE_ENV} mode`)
    } catch (error) {
        console.error('Error connecting to database:',error);

        process.exit(1);
    }
}

export default connectToDatabase;