import mongoose from "mongoose";

const customerSchema =  new mongoose.Schema({
    orderId:{
        type:String
    },
    customerName:{
        type:String
    },
    customerAddress:{
        type:String 
    },
    customerPhoneNumber:{
        type:String 
    },
    customerAlternatePhoneNumber:{
        type:String 
    },
    otherDetails:{
        type: String 
    }
})

export const Customer = mongoose.model("customers", customerSchema)