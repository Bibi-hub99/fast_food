const {getProductData,likeProduct,dislikeProduct,addComment} = require("../controllers/product-data")

const express = require("express")

const Router = express.Router()

Router.get("/:productID",getProductData)
Router.put("/:productDataID/like",likeProduct)
Router.put("/:productDataID/dislike",dislikeProduct)
Router.put("/:productDataID/comment",addComment)

module.exports = Router