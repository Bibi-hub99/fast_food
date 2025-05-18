const ProductModel = require("../models/products")

const findAllProducts = async (req,res)=>{
    try{
        const response = await ProductModel.findAllProducts()
        res.status(200).json({success:true,meals:response})
    }catch(err){
        console.log(err)
    }
}

const findSingleProduct = async(req,res)=>{
    /*const response = await ProductModel.getSingleProduct()*/
    const {productID} = req.params;
    console.log(productID)
    res.status(200).json({success:true,meals:{}})
}

module.exports = {findAllProducts,findSingleProduct}