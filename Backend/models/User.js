import mongoose, { Mongoose } from "mongoose";

let UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    FullName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avtar:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYP-KKtRJXm9qK7k2_PA1utxbxWdpzGIdulQ&s"
    }

})

export default mongoose.model("User",UserSchema)
