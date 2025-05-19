const ProductModel = require("../models/products")

const findAllProducts = async (req,res)=>{
    try{
        const response = await ProductModel.find({})
        console.log(response)
        res.status(200).json({success:true,meals:response})
    }catch(err){
        console.log(err)
    }
}

const findSingleProduct = async(req,res)=>{
    const {productID} = req.params;
    const response = await ProductModel.getSingleProduct(productID)

    res.status(200).json({success:true,meals:response})
}

module.exports = {findAllProducts,findSingleProduct}