import {Schema,model,Types} from "mongoose"
import passportLocalMongoose from "passport-local-mongoose"
interface User{
    name:String;
    email:String;
    encry_passward:String;
    upcomingEvent:Types.ObjectId
    salt:String;
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
        trim:true,
        unique:true
    },
    salt:{
        type:String
    },
    encry_passward:{
        type:String,
        trim:true
    },
    upcomingEvent:{
        type:[Schema.Types.ObjectId],
        ref:"event"
    }
},{timestamps:true})

// userSechma.plugin(passportLocalMongoose);

export default model("User",userSechma);

