import mongoose from "mongoose";
import "dotenv/config";

export default function dbConnect(){
    mongoose.connect(process.env.MongoUri).then(()=>{
        console.log('Connected to MongoDB')
    })
}