import mongoose from "mongoose";

const PlaceSchema=mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title:String,
    address:String,
    addedphoto:[String],
    description:String,
    perks:[String],
    extraInfo:String,
    checkIn:Number,
    checkOut:Number,
    maxGuests:Number,
    price:Number
})

const PlaceModel=new mongoose.model("Place",PlaceSchema);

export default PlaceModel