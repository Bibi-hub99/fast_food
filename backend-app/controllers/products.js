const ProductModel = require("../models/products")

const findAllProducts = async (req,res)=>{
    try{
        const response = await ProductModel.find({})
        res.status(200).json({success:true,meals:response})
    }catch(err){
        console.log(err)
    }
}

const findSingleProduct = async(req,res)=>{
    const {productID} = req.params;
    const response = await ProductModel.getSingleProduct(productID)
    const similar = await response.findSimilarProducts()
    res.status(200).json({success:true,meals:response,similarProducts:similar})
}

const getByCategory = async (req,res)=>{
    try{
        const {query,limit} = req.query
        const response = await ProductModel.findByCategory(query)
        res.status(200).json({success:true,meals:response})
    }catch(err){
        console.log(err)
    }
}

const querySearch = async(req,res)=>{
    const {searchTerm,minPriceStart,minPriceEnd,midPriceStart,midPriceEnd,highPriceStart,highPriceEnd,limit} = req.query
    try{
        const response = await ProductModel.querySearch({
            searchTerm,
            minPriceStart,minPriceEnd,
            midPriceStart,midPriceEnd,
            highPriceStart,highPriceEnd,  
            limit
        })
        res.status(200).json({success:true,meals:response})
    }catch(err){
        console.log(err)
    }
}

module.exports = {findAllProducts,findSingleProduct,getByCategory,querySearch}