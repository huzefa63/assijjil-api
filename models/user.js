import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String,
        // required:true,
    },
    email:{
        type:String,
        required:[true,'email is required'],
    },
    profilePhoto:{
        type:String,
    },
    jadeedSurah:String,
    jadeedAyah:Number,
},{timestamps:true});

const model = mongoose.model('User',schema);

export default model;