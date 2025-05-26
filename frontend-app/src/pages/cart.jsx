import CartCard from "../components/cart"
import {useLoaderData} from "react-router-dom"
import {useState,useEffect} from "react"
import {useNavigate} from "react-router-dom"
import Button from "../components/button"
import numeral from "numeral"

function Cart(){

    const loaderData = useLoaderData()
    const [myCart,setMyCart] = useState(loaderData || [])

    const removeItem = (_id)=>{

        const findInCart = myCart.findIndex((each)=>{
            return each._id === _id
        })
        
        setMyCart((oldValue)=>{
            return [
                ...oldValue.slice(0,findInCart),...oldValue.slice(findInCart+1)
            ]
        })

    }

    useEffect(()=>{
        setMyCart((oldValue)=>{
            return oldValue.length > 0 ? oldValue.map((each)=>{
                return {
                    ...each,
                    ['quantity']:each.quantity ? each.quantity:1
                }
            }):[]
        })
    },[])

    useEffect(()=>{
        localStorage.setItem("my-cart-food",JSON.stringify(myCart))
    },[myCart])

    const decrementQuantity = (_id)=>{

        setMyCart((oldValue)=>{
            return oldValue.map((each)=>{
                return each._id === _id ? 
                {...each,quantity:each.quantity > 1 ? each.quantity-1:1}
                :{...each}
            })
        })

    }

    const incrementQuantity = (_id)=>{

        setMyCart((oldValue)=>{
            return oldValue.map((each)=>{
                return each._id === _id ? 
                {
                    ...each,
                    quantity:each.quantity+1
                }
                :{...each}
            })
        })

    }

    const totalPrice = numeral(myCart.reduce((prevValue,currentValue)=>{
        return prevValue + (currentValue.price * currentValue.quantity)
    },0)).format("0,0.00")


    return (
        <div className={'text-white mb-16'}>
            <div className={`flex flex-col md:flex-row md:justify-between md:items-start`}>
                <div className={`md:w-[58%] lg:w-[50%]`}>
                    {
                        myCart.length > 0 ? myCart.map((each)=>{
                            return (
                                <CartCard 
                                key={`cartcard${each._id}`} 
                                imageURL={each.imageURL}
                                name={each.name}
                                price={each.price}
                                quantity={each.quantity}
                                meal_id={each._id}
                                increment={incrementQuantity}
                                decrement={decrementQuantity}
                                removeItem={removeItem}
                                />
                            )
                        }):<p>The cart is empty</p>
                    }
                </div>
                {myCart.length > 0 && <div className={`w-full md:w-[40%] lg:w-[35%] rounded-[2rem] py-5 px-2 box-border fixed bottom-0 left-0 bg-orange-500 md:left-[59%] lg:left-[61%] md:bottom-auto`}>
                    <p>Total : R {totalPrice}</p>
                    <Button
                    btnInnerText={'Checkout'}
                    btnStyle={'bg-black py-2 px-5 rounded-[2rem] absolute top-[20%] right-2 cursor-pointer'}/>
                </div>}
            </div>
            <p></p>
        </div>
    )

}

export default Cart