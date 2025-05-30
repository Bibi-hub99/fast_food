const mongoose = require("../mongoose")

const productSchema = new mongoose.Schema({

    name:{type:String,required:true,minLength:1},
    price:{type:Number,required:true,min:1},
    description:{type:String,required:true,minLength:1},
    category:{type:String,required:true,minLength:1},
    tags:[String],
    quantity:{type:Number,min:1,required:true},
    productID:{type:String,required:true}
})

const orderSchema = new mongoose.Schema({

    buyerName:{type:String,minLength:1,required:true,set:(v)=>v.toUpperCase()},
    buyerTelephone:{type:String,minLength:1,required:true},
    deliveryAddress:{type:String,minLength:1,required:true},
    items:[productSchema]

})

module.exports = {orderSchema}