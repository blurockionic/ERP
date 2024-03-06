import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
    leadId: {
        type:String 
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String ,
    },
    mobileNumber:{
        type:String,
        required :true 
    },
    email:{
        type: String, 
    },
    stageMoveReason:{
        type:String,
    },
    stage: {
        type:String
    },
    creationDate:{
        type:String 
    },
    gender:{
        type:String 
    },
    dateOfBirth:{
        type:String 
    },
    owner:{
        type:String 
    },
    leadDescription:{
        type:String 
    },
    maritalStatus:{
        type:String 
    },
    assignBy:{
        type:String 
    },
    createdBy:{
        type:String 
    },
    lastActivityDate:{
        type:String 
    },
    lastModifiedDate:{
        type:String 
    }
},
{
    timestamps: true
}
)


export const Lead = mongoose.model("lead", leadSchema);