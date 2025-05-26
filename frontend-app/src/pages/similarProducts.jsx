import {useOutletContext} from "react-router-dom"
import {useState,useEffect} from "react"
import ProductCard from "../components/productCard"
import Banner from "../components/banner"


function SimilarProducts(props){

    const [productData,setProductData,singleMeal,similarMeals] = useOutletContext()


    const [myFavs,setMyFavs] = useState(JSON.parse(localStorage.getItem("my-favorite-food")) || [])
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

        const findInSimilar = similarMeals.find((each)=>{
            return each._id === _id
        })

        if(myCart.length < 1){

            setMyCart((oldValue)=>{
                return [
                    ...oldValue,
                    {...findInSimilar}
                ]
            })

            handleBanner({state:true,message:"added to cart",bgColor:"green"})
            setTimeout(()=>handleBanner({state:false,message:"",bgColor:""}),2000)              

        }else{


            const findInCart = myCart.find((each)=>{
                return each._id === _id
            })

            if(!findInCart){

                setMyCart((oldValue)=>{
                    return [
                        ...oldValue,
                        {...findInSimilar}
                    ]
                })
                handleBanner({state:true,message:"added to cart",bgColor:"green"})
                setTimeout(()=>handleBanner({state:false,message:"",bgColor:""}),2000)                   
        
            }else{
                handleBanner({state:true,message:"already exist in cart",bgColor:'red'})
                setTimeout(()=>handleBanner({state:false,message:"",bgColor:""}),2000)                
            }
        }

    }

    const addToFavs = (_id)=>{

        const findInSimilar = similarMeals.find((each)=>{
            return each._id === _id
        })

        if(myFavs.length < 1){
            setMyFavs((oldValue)=>{
                return [
                    ...oldValue,
                    {...findInSimilar}
                ]
            })
            handleBanner({state:true,message:'added to favorites',bgColor:'green'})
            setTimeout(()=>handleBanner({state:false,message:"",bgColor:""}),2000)        
        }else{

            const findInFavs = myFavs.find((each)=>{
                return each._id === _id
            })
        
            if(!findInFavs){
                setMyFavs((oldValue)=>{
                    return [...oldValue,{...findInSimilar}]
                })
                handleBanner({state:true,message:'added to favorites',bgColor:'green'})
                setTimeout(()=>handleBanner({state:false,message:"",bgColor:""}),2000)    
            }else{
                handleBanner({state:true,message:"already exist in favorites",bgColor:'red'})
                setTimeout(()=>handleBanner({state:false,message:"",bgColor:""}),2000)         
            }

        }

    }

    useEffect(()=>{
        localStorage.setItem("my-cart-food",JSON.stringify(myCart))
    },[myCart])

    useEffect(()=>{
        localStorage.setItem("my-favorite-food",JSON.stringify(myFavs))
    },[myFavs])      


    return (
        <div className={"text-white"}>
            {
                typeof(similarMeals) == "object" ? similarMeals.length > 0 ?
                <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"}>
                    {
                        similarMeals.map((each)=>{
        
                            return (
                                <ProductCard
                                key={`similarMeals${each._id}`}
                                cardStyle={"border-2 rounded-md border-white text-white transition duration-100 hover:text-orange-500 hover:border-orange-500"}
                                mealID={`../../menu/${each._id}`}
                                isRelative={false}
                                imageURL={each.imageURL}
                                mealName={each.name}
                                mealPrice={each.price}
                                meal_id={each._id}
                                addToFavs={addToFavs}
                                addToCart={addToCart}
                                byPass={true}/>
                            )
                        })
                    }
                </div>
                :<p>No Similar Meals</p>:<p>No Similar Meals</p>
            }
            <Banner bannerState={bannerState.state} bannerBgColor={bannerState.bgColor} bannerMessage={bannerState.message}/>
        </div>
    )

}

export default SimilarProducts