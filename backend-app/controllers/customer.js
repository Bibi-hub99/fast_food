const OrderModel = require("../models/orders")
const ProductModel = require("../models/products")

const addOrder = async (req,res)=>{
    try{

        const {buyerName,buyerTelephone,deliveryAddress,items} = req.body

        const demo = [...items].map((each)=>{

            each = {...each,productID:each._id}
            delete each._id
            delete each.locations
            delete each.imageURL
            delete each.available
            return each

        })

        const purchaseQuery = demo.map((each)=>{
            return {
                updateOne:{
                    filter:{_id:each.productID},
                    update:{$inc:{available:-each.quantity}}
                }
            }
        })

        await ProductModel.validatePurchase(purchaseQuery)
        await OrderModel.newOrder({
            buyerName:buyerName,
            buyerTelephone:buyerTelephone,
            deliveryAddress:deliveryAddress,
            items:demo
        })

        const afterPurchaseQuery = demo.map((each)=>{
            const product = ProductModel.purchaseResults(each.productID)
            return product
        })
        
        let response = await Promise.all(afterPurchaseQuery)
        res.status(200).json({success:true,response:response})

    }catch(err){
        console.log(err)
    }
}

const getAllOrders = async(req,res)=>{
    try{
        const response = await OrderModel.allOrders()
        res.status(200).json({success:true,response:response})
    }catch(err){
        console.log(err)
    }
}

const deleteOrder = async(req,res)=>{
    try{
        const {orderID} = req.params
        await OrderModel.deleteOrder(orderID)
        const response = await OrderModel.allOrders()
        res.status(200).json({success:true,response:response})
    }catch(err){
        console.log(err)
    }
}

module.exports = {addOrder,getAllOrders,deleteOrder}