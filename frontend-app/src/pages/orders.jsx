import {useState,useEffect,Suspense} from "react"
import {Await,useLoaderData} from "react-router-dom"
import Spinner from "../components/suspense-fallback"
import Order from "../components/order"
import numeral from "numeral"
import {deleteOrder} from "../http"

function Orders(){

    const {response} = useLoaderData()
    const [orders,setOrders] = useState([])
    
    const handleDeleteOrder = async(orderID)=>{
        try{
            const response = await deleteOrder(orderID)
            setOrders(response.response)
        }catch(err){
            console.log(err)
        }
    }

    return (
        <Suspense fallback={<Spinner/>}>
            <Await resolve={response}>
                {
                    ({data})=>(

                        <div>
                            <div>
                                {
                                    useEffect(()=>{
                                        setOrders(data.response)
                                    },[])
                                }
                            </div>
                            <div>
                                <div className={'text-white'}>
                                    {
                                        orders.length > 0 ? orders.map((each)=>{

                                            const {average,items,maxSpent,minSpent,numberOfItems,total,_id} = each
                                            
                                            return (
                                                <Order 
                                                key={`orders${_id._id}`} 
                                                customerName={_id.clientName}
                                                customerTelephone={_id.clientCell}
                                                customerAddress={_id.clientAddress}
                                                highestSpent={numeral(maxSpent).format("0,0.00")}
                                                lowestSpent={numeral(minSpent).format("0,0.00")}
                                                average={numeral(average).format("0,0.00")}
                                                itemsNum={numeral(numberOfItems).format("0,0.00")}
                                                totalPrice={numeral(total).format("0,0.00")}
                                                orderID={_id._id}
                                                handleDeleteOrder={handleDeleteOrder}>
                                                    {
                                                        items.map((item)=>{
                                                            const price = numeral(item.price).format("0,0.00")
                                                            return (
                                                                <tr className={'border-b-1 '} key={`items${item._id}`}>
                                                                    <td>{item.name}</td>
                                                                    <td>R {price}</td>
                                                                    <td>{item.description}</td>
                                                                    <td>{item.quantity}</td>
                                                                </tr>
                                                                )
                                                        })
                                                    }
                                                </Order>
                                            )
                                        }):<h1>No orders yet</h1>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </Await>
        </Suspense>
    )

}

export default Orders