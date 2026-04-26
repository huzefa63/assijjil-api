import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
import app from "./app.js";

app.listen(4000,async () => {
    try{
        console.log('connecting')
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected');
    }catch(err){
        console.log(err);
    }
});