import mongoose from "mongoose";


const wilayaSchema = new mongoose.Schema({
    name:{
        type : String,
    },
    picturePath:{type : String},
    restos : [String]
},{timestamps: true})


const Wilaya = mongoose.model("Wilaya", wilayaSchema);
export default Wilaya;