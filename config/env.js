import {config} from 'dotenv'
config({path:`.env.${process.env.NODE_ENV || 'development'}.local`});

export const {
    // Server
    PORT,
    NODE_ENV,
    SERVER_URL,
  
    // Database
    db_URI,
  
    // Authentication
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_ENV, ARCJET_KEY,
    QSTASH_TOKEN,QSTASH_URL,
    EMAIL_PASSWORD,
  } = process.env;
  
