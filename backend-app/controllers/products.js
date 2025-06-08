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

const updateProduct = async(req,res)=>{

    const {productID} = req.params
    const {name,imageURL,price,description,category,tags,locations} = req.body
    const updateObj = {
        _id:productID,
        imageURL:imageURL,
        name:name,
        price:price,
        description:description,
        category:category,
        tags:tags,
        locations:locations
    }
    try{
        const response = await ProductModel.productUpdate(updateObj)
        res.status(200).json({success:true,meals:response})
    }catch(err){
        console.log(err)
    }

}

const addProduct = async(req,res)=>{

    try{

        const {name,imageURL,price,description,category,tags,locations} = req.body

        const productObj = {
            name:name,
            imageURL:imageURL,
            price:price,
            description:description,
            category:category,
            tags:tags,
            locations:locations
        }

        const response = await ProductModel.productAdd(productObj)
        res.status(200).json({success:response})

    }catch(err){
        console.log(err)
    }

}

const purchase = async(req,res)=>{
    const {buyerName,buyerTelephone,deliveryAddress,items} = req.body
    res.status(200).json({success:true})

}

module.exports = {findAllProducts,findSingleProduct,getByCategory,querySearch,updateProduct,addProduct,purchase}