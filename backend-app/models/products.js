const mongoose = require("../mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        minLength:3,
        required:true,
        unique:true,
    },
    imageURL:{
        type:String,
        required:true,
        minLength:1,
        unique:true,
    },
    price:{
        type:Number,
        required:true,
        min:1,
    },
    description:{
        type:String,
        required:true,
        minLength:1,
        maxLength:100,
    },
    tags:[String],
    locations:[
        {
            town:String
        }
    ]
})

productSchema.statics.findAllProducts = async function findAllProducts(){
    try{
        const response = await this.find({})
        return response;
    }catch(err){
        console.log(err)
    }
}

productSchema.statics.getSingleProduct = async function getSingleProduct(productID){
    try{
        const response = await this.findOne({
            _id:{
                $eq:productID
            }
        })
        return response
    }catch(err){
        console.log(err)
    }
}

const ProductModel = mongoose.model('products',productSchema,'products')

module.exports = ProductModel