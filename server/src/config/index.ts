import * as dotenv from 'dotenv';
dotenv.config();

export const dev = {
  app: {
    port: process.env.SERVER_PORT || 3002,
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY || "Secret",
    authEmail: process.env.AUTH_EMAIL,
    authPassword: process.env.AUTH_PASSWORD,
  },
  db: {
    url: process.env.MONGODB_URL || ''
  },
  
};

/*require("dotenv").config();

export const dev = {
    db: {
      url: process.env.DB_URL || "",
      
    },
    app: {
      port : process.env.SERVER_PORT || "4000",
      jwtPrivateKey: process.env.JWT_PRIVATE_KEY ,
    },
};*/