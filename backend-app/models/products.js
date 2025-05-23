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


productSchema.methods.findSimilarProducts = async function findSimilarProducts(){
    try{
        return await mongoose.model("products").find({
            $and:[
                {
                    tags:{
                        $in:this.tags
                    }
                },
                {
                    _id:{$ne:this._id}
                }
            ]
        })
    }catch(err){
        console.log(err)
    }
}

productSchema.statics.findByCategory = async function findByCategory(category){
    try{
        const response = await this.find({
            category:{
                $eq:category
            }
        })
        return response
    }catch(err){
        console.log(err)
    }
}

productSchema.statics.querySearch = async function querySearch
({searchTerm,
minPriceStart,
minPriceEnd,
midPriceStart,
midPriceEnd,
highPriceStart,
highPriceEnd,
limit}){
    
    try{

        const query = {}
        const filters = []

        if(searchTerm){
            query.$text = {
                $search:`\"${searchTerm}\"`
            }
        }

        if(minPriceStart !== "undefined"){
            filters.push({price:{$gte:Number(minPriceStart),$lte:Number(minPriceEnd)}})
        }

        if(midPriceStart !== "undefined"){
            filters.push({price:{$gte:Number(midPriceStart),$lte:Number(midPriceEnd)}})
        }

        if(highPriceStart !== "undefined"){
            filters.push({price:{$gte:parseFloat(highPriceStart),$lte:parseFloat(highPriceEnd)}})
        }

        if(filters.length > 0){
            query.$or = filters
        }

        let queryBuilder = this.find(query)

        if(limit){
            queryBuilder = queryBuilder.limit(Number(limit))
        }

        console.log(filters)

        return await queryBuilder

    }catch(err){
        console.log(err.message)
    }

}

const ProductModel = mongoose.model('products',productSchema,'products')

module.exports = ProductModel