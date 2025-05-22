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

        let response
        let lowFilter = []
        let midFilter = []
        let highFilter = []

        if(searchTerm){
            response = await this.find({
                $text:{
                    $search:`\"${searchTerm}\"`
                }
            })
        }

        /*lowFilter = await response.find({
            $and:[
                {
                    price:{
                        $gte:minPriceStart
                    }
                },
                {
                    price:{
                        $lte:minPriceEnd
                    }
                }
            ]
        })

        midFilter = await response.find({
            $and:[
                {
                    price:{
                        $not:{
                            $lt:midPriceStart
                        }
                    }
                },
                {
                    price:{
                        $not:{
                            $gt:midPriceEnd
                        }
                    }
                }
            ]
        })

        highFilter = await response.find({
            $and:[
                {
                    price:{
                        $gte:highPriceStart
                    }
                },
                {
                    price:{
                        $lte:highPriceEnd
                    }
                }
            ]
        })

        response = [...lowFilter,midFilter,highFilter]

        if(limit){
            response = await response.find({}).limit(limit)
        }
        */
        console.log(searchTerm)
        console.log(response)
        return response;

    }catch(err){
        console.log(err)
    }
}

const ProductModel = mongoose.model('products',productSchema,'products')

module.exports = ProductModel