import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    userId:{
        type : String,
    },
    userF:{
        type : String,
    },
    userL:{
        type : String,
    },
    resId:{
        type : String,
    },
    note: {
        type : Number
    },
    content : {
        type : String,
    },
    
},{timestamps: true})


const Comment = mongoose.model("Comment", commentSchema);
export default Comment;