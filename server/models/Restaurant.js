import mongoose from "mongoose";


const restaurantSchema = new mongoose.Schema({
    name:{
        type : String,
        required : [true , "Plz! Insert a name "]
    },
    address: {
        type : String
    },
    city : {
        type : String,
        required : [true , "Plz! Choose a city "]
    },
    phone : {
        type : String
    },
    minPrice : {
        type : Number,
        required : [true , "Plz! Insert a minimum price "]
    } ,
    picturePath: {
        type: String,
        default: "",
    },
    resNote : {
        type : Number,
        default : 0
    },
    reviews : {
        type : Number,
        default : 0
    },
    moyen : {
        type : Number,
        default : 0
    },
    usersReviewed : [String],
    comments : [String],
    tags : [String]
    ,
    description : {
        type : String
    },
    contactFirstName:{
        type : String,
        required : [true , "Plz! Insert a firstName"]
    },
    contactLastName:{
        type : String,
        required :[true , "Plz! Insert a lastName"]
    },
    contactEmail:{
        type : String,
        required : [true , "Plz! Insert an email"],
        lowercase : true,
    },
    contactPhone : {
        type : String
    }
},{timestamps: true})


const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;