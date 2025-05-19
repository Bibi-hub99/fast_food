const mongoose = require("../mongoose")

const commentSchema = new mongoose.Schema({

    commentDate:{
        type:Date,
        required:true,
        default:Date.now()
    },
    commentText:{
        type:String,
        minLength:1,
        maxLength:100,
        required:true
    }
})

const productSchema = new mongoose.Schema({
    productID:{
        type:String,
        required:true,
        unique:true,
    },
    likes:{
        type:Number,
        default:0,
    },
    dislikes:{
        type:Number,
        default:0
    },
    comments:[commentSchema]

})

productSchema.statics.getProductData = async function getProductData(productID){
    try{
        const response = await this.findOne({
            productID:{
                $eq:productID
            }
        })
        return response
    }catch(err){
        console.log(err)
    }
}

productSchema.statics.likeProduct = async function likeProduct(productDataID){
    try{
        await this.findByIdAndUpdate(productDataID,{
            $inc:{
                likes:1
            }
        },{upsert:true})
        const response = await this.findById(productDataID,{likes:1})
        return response
    }catch(err){
        console.log(err)
    }
}

productSchema.statics.dislikeProduct = async function dislikeProduct(productDataID){
    try{

        await this.findByIdAndUpdate(productDataID,{
            $inc:{
                dislikes:1
            }
        },{upsert:true})

        const response = await this.findById(productDataID,{dislikes:1})
        return response;

    }catch(err){
        console.log(err)
    }
}

productSchema.statics.addComment = async function addComment(productDataID,productComment){
    try{
        await this.findByIdAndUpdate(productDataID,{
            $push:{
                comments:{
                    commentText:productComment
                }
            }
        })
        const response = await this.findById(productDataID,{comments:1})
        return response
    }catch(err){
        console.log(err)
    }
}

const ProductSchemaModel = mongoose.model("productData",productSchema,"productData")

module.exports = ProductSchemaModel