import mongoose  from "mongoose";

let PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type:String
    },
    poster:{
        type:String,
        default:"https://placehold.co/600x400"
    },
    content:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("Post",PostSchema);