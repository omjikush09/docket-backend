import {Schema,model,Types} from "mongoose"

interface User{
    name:String;
    email:String;
    encry_passward:String;
    upcomingEvent:Types.ObjectId
}


const userSechma =new Schema<User>({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    encry_passward:{
        type:String,
    },
    upcomingEvent:{
        type:[Schema.Types.ObjectId],
        ref:"event"
    }
},{timestamps:true})

export default model("Model",userSechma);