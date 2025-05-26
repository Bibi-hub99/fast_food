import {useState,useEffect} from "react"
import {useLoaderData} from "react-router-dom"
import Favorite from "../components/favorite"
import Banner from "../components/banner"


function Favorites(){

    const loaderData = useLoaderData()

    const [myFavs,setMyFavs] = useState(loaderData || [])
    const [myCart,setMyCart] = useState(JSON.parse(localStorage.getItem("my-cart-food")) || [])

    const [bannerState,setBannerState] = useState({
        state:false,
        message:"",
        bgColor:'red'
    })    

    const handleBanner = ({state,message,bgColor})=>{
        setBannerState((oldValue)=>{
            return {
                state:state,
                message:message,
                bgColor:bgColor
            }
        })
    } 

    const addToCart = (_id)=>{

        const findProduct = myFavs.find((each)=>{
            return each._id === _id
        })

        if(myCart.length < 1){

            setMyCart((oldValue)=>{
                return [
                    ...oldValue,
                    {...findProduct}
                ]
            })
            handleBanner({state:true,message:"added to cart",bgColor:"green"})
            setTimeout(()=>handleBanner({state:false,message:"added to cart",bgColor:""}),2000)   

        }else{

            const findInCart = myCart.find((each)=>{
                return each._id === _id
            })

            if(!findInCart){

                setMyCart((oldValue)=>{
                    return [
                        ...oldValue,
                        {...findProduct}
                    ]
                })
                handleBanner({state:true,message:"added to cart",bgColor:"green"})
                setTimeout(()=>handleBanner({state:false,message:"added to cart",bgColor:""}),2000)   

            }else{
                handleBanner({state:true,message:"already exist in cart",bgColor:"red"})
                setTimeout(()=>handleBanner({state:false,message:"",bgColor:""}),2000)   
            }

        }
        
    }

    const removeItem = (_id) => {

        const findInFavs = myFavs.findIndex((each)=>{
            return each._id === _id
        })

        setMyFavs((oldValue)=>{
            return[
                ...oldValue.slice(0,findInFavs),...oldValue.slice(findInFavs+1)
            ]
        })

    }

    useEffect(()=>{
        localStorage.setItem("my-favorite-food",JSON.stringify(myFavs))
    },[myFavs])

    useEffect(()=>{
        localStorage.setItem("my-cart-food",JSON.stringify(myCart))
    },[myCart])

    return (
        <div className={'mb-5'}>

            <div className={'text-white'}>
                <div className={''}>
                    {
                        myFavs.length > 0 ? myFavs.map((each)=>{
                            return (
                                <Favorite 
                                imageURL={each.imageURL} 
                                name={each.name} price={each.price}
                                meal_id={each._id} addToCart={addToCart}
                                removeItem={removeItem}
                                key={ `favs${each._id}`}
                                />
                            )
                        }):<p>You do not have favorites yet</p>
                    }
                </div>
            </div>
            <Banner bannerState={bannerState.state} bannerBgColor={bannerState.bgColor} bannerMessage={bannerState.message}/>
                  
        </div>
    )



}

export default Favorites