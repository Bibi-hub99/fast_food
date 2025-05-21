const ProductDataModel = require("../models/product-data")

const getProductData = async(req,res)=>{
    const {productID} = req.params
    try{
        const response = await ProductDataModel.getProductData(productID)
        res.status(200).json({success:true,productData:response})
    }catch(err){
        console.log(err)
    }
}

const likeProduct = async(req,res)=>{
    const {productDataID} = req.params
    try{
        const response = await ProductDataModel.likeProduct(productDataID)
        res.status(200).json({success:true,meal:response})
    }catch(err){
        console.log(err)
    }
}

const dislikeProduct = async (req,res)=>{
    try{
        const {productDataID} = req.params;
        const response = await ProductDataModel.dislikeProduct(productDataID)
        res.status(200).json({success:true,meal:response})
    }catch(err){
        console.log(err)
    }
}

const addComment = async(req,res)=>{

    try{

        const {productComment} = req.body
        const {productDataID} = req.params

        const response = await ProductDataModel.addComment(productDataID,productComment)
        res.status(200).json({success:true,meal:response})

    }catch(err){
        console.log(err)
    }
}



module.exports = {getProductData,likeProduct,dislikeProduct,addComment}