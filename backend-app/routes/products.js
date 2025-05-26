const express = require("express")
const {findAllProducts,findSingleProduct,getByCategory,querySearch,updateProduct,addProduct} = require("../controllers/products")

const Router = express.Router()

Router.get("/",findAllProducts)
Router.get("/search",querySearch)
Router.get("/categories",getByCategory)
Router.get("/product/:productID",findSingleProduct)

Router.put("/product/:productID/update",updateProduct)
Router.post("/add-product",addProduct)

module.exports = Router