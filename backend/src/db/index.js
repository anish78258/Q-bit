import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
try{
    await mongoose.connect(`${process.env.MONG0DB_URI}/${DB_NAME}`)
    console.log('connected to db')
}
catch(error){
    console.log("Not Connected" , error);
}
}

export default connectDB