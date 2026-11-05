
import { betterAuth} from "better-auth";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.MONGO_AUTH_URL;

const client = new MongoClient(mongoUrl);
const db = client.db('assigment-8');

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID ,
            clientSecret: process.env.GOOGLE_SECRET_KEY
        },
           github: { 
            clientId: process.env.GITHUB_CLIENT_ID, 
            clientSecret: process.env.GITHUB_SECRET_KEY
        }, 
    },
    plugins:[jwt()],
    session:{
      cookieCache:{
        enabled:true,
        strategy:'jwt',
        maxAge: 3 * 24 * 60 * 60
      }
    }
});
