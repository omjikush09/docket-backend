import {Schema,model,Types} from "mongoose"

interface Event{
    day:String;
    time:Date;
    eventName:String;
    topic:String;
    description:String;
    

}


const eventSechma =new Schema<Event>({
    day:{
        type:String,
        required:true,
        trim:true
    },
    time:{
        type:Date,
        required:true,
        trim:true
    },
    eventName:{
        type:String,
        required:true,
        trim:true
    },
    topic:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true

    }

},{timestamps:true})

export default model("Model",eventSechma);