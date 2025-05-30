const mongoose = require("../mongoose")
const {orderSchema} = require("../schemas/schemas")


orderSchema.statics.newOrder = async function newOrder({buyerName,buyerTelephone,deliveryAddress,items}){

    try{
        const newOrder = new this({
            buyerName:buyerName,
            buyerTelephone:buyerTelephone,
            deliveryAddress:deliveryAddress,
            items:[...items]
        })
        await newOrder.save()
        console.log('order created successfully')
    }catch(err){
        console.log(err)
    }
}

orderSchema.statics.allOrders = async function allOrders(){
    try{
        const response = await this.aggregate([
            {
                $match:{}
            },
            {
                $unwind:"$items"
            },
            {
                $project:{
                    _id:1,
                    buyerName:1,
                    buyerTelephone:1,
                    deliveryAddress:1,
                    items:1,
                    subTotal:{$multiply:["$items.price","$items.quantity"]}
                }
            },
            {
                $group:{
                    _id:{
                        _id:'$_id',
                        clientName:'$buyerName',
                        clientCell:'$buyerTelephone',
                        clientAddress:'$deliveryAddress'
                    },
                    numberOfItems:{$sum:1},
                    items:{$push:'$items'},
                    minSpent:{$min:'$items.price'},
                    maxSpent:{$max:"$items.price"},
                    average:{$avg:"$subTotal"},
                    total:{$sum:"$subTotal"}
                }
            }
        ])

        return response

    }catch(err){
        console.log(err)
    }
}

orderSchema.statics.deleteOrder = async function deleteOrder(orderID){
    try{
        await this.findByIdAndDelete(orderID)
    }catch(err){
        console.log(err)
    }
}

const OrderModel = mongoose.model('orders',orderSchema,'orders')
module.exports = OrderModel