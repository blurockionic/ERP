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
    customerEmail:{
        type:String 
    },
    otherDetails:{
        type: String 
    },
    dateAndTime:{
        type: Date
    },
    isTentOrdered:{
        type:Boolean,
        default: false
    },
    isCateringOrdered:{
        type:Boolean,
        default: false 
    },
    isDecorationOrdered:{
        type:Boolean,
        default: false 
    },
    isBistarOrdered:{
        type:Boolean,
        default: false 
    },
    isLightOrdered:{
        type: Boolean,
        default: false 
    },
    isFinalOrderSubmited:{
        type:Boolean,
        default: false
    }
},{
    timestamps: true
})

export const Customer = mongoose.model("customers", customerSchema)