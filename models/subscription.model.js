import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,'subscription name is required'],
        trim:true,
        minLength:2,
        maxLength:100,
    },
    price:{
        type:Number,
        required: [true,'subscription price is required'],
        min:[0,'price must be greater than 0'],
        max:[1000,'price must be less than 1000'],
    },
    currency:{
        type: String,
        enum:['USD','EUR','GDP'],
        default:'USD'
    },
    frequency:{
       type: String,
       enum:['daily','weekly','monthly','yearly'],
    },
    category:{
        type:String,
        enum:['sport','news','entertainment','lifestyle','technology','finance','politics','other'],
        required:true,
    },
    paymentMethode:{
        type:String,
        required: true,
        trim: true,
    },
    status:{
        type: String,
        enum:['active','cancelled','expired'],
        default:'active'
    },
    startDate:{
        type: Date,
        required: true,
        validate:{
            validator:function(value){
                return value > this.startDate;
            },
            message:'renawal date must be after the start date',
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
        index:true,

    }

},{timestamps: true});