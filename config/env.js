import {config} from 'dotenv'
config({path:`.env.${process.env.NODE_ENV || 'development'}.local`});

export const {
    // Server
    PORT,
    NODE_ENV,
  
    // Database
    db_URI,
  
    // Authentication
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_ENV, ARCJET_KEY
  } = process.env;
  
