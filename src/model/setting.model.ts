import mongoose, { Connection } from "mongoose";
import {Schema } from "mongoose";

interface ISetting {
    ownerId:string
    businessName:string
    supportEmail:string
    knowledge:string
}

const settingSchema = new Schema<ISetting>({
    ownerId:{type:String, required:true,unique:true},
    businessName:{type:String, required:false},
    supportEmail:{type:String, required:false},
    knowledge:{type:String, required:false}  

},{timestamps:true})

const setting = mongoose.models.Setting || mongoose.model("Setting", settingSchema)

export default setting;