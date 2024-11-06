import mongoose from "mongoose";


const eventSchema = new  mongoose.Schema({
title : {
    type : String,
    required : true
},
discription : {
    type : String,
    required : true
},
event_date : {
    type : Date,
    required : true
}

} , {timestamps : true})

export const Event = mongoose.model("Event" , eventSchema)