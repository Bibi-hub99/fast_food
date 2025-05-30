import {useLoaderData,Await} from "react-router-dom"
import {Suspense,useState,useEffect} from "react"
import Spinner from "../components/suspense-fallback"
import ProductCard from "../components/productCard"
import Banner from "../components/banner"


function AllMenuProducts(){

    const {response} = useLoaderData()
    const [menuItems,setMenuItems] = useState([])
    const [myFavs,setMyFavs] = useState(JSON.parse(localStorage.getItem("my-favorite-food")) || [])
    const [myCart,setMyCart] = useState(JSON.parse(localStorage.getItem("my-cart-food")) || [])

    const [bannerState,setBannerState] = useState({
        state:false,
        message:"",
        bgColor:'red'
    })    

    console.log(menuItems)

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

        const findInMenu = menuItems.find((each)=>{
            return each._id === _id
        })

        if(myCart.length < 1){

            setMyCart((oldValue)=>{
                return [
                    ...oldValue,
                    {...findInMenu}
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
                        {...findInMenu}
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

        const findInMenu = menuItems.find((each)=>{
            return each._id === _id
        })

        if(myFavs.length < 1){
            setMyFavs((oldValue)=>{
                return [
                    ...oldValue,
                    {...findInMenu}
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
                    return [...oldValue,{...findInMenu}]
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
        <Suspense fallback={<Spinner/>}>
            <Await resolve={response}>
                {
                    ({data})=>(
            
                        <div>
                            {
                                useEffect(()=>{
                                    setMenuItems(data.meals)
                                },[])
                            }
                            <div>
                                <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'}>
                                    {
                                        menuItems.length > 0 ? menuItems.map((each)=>{
                                            return (
                                                <ProductCard
                                                key={`menuItems${each._id}`} 
                                                cardStyle={'border-2 rounded-md border-white text-white transition duration-100 hover:text-orange-500 hover:border-orange-500 '}
                                                mealID={each._id}
                                                imageURL={each.imageURL}
                                                mealName={each.name}
                                                mealPrice={each.price}
                                                addToCart={addToCart}
                                                addToFavs={addToFavs}
                                                />
                                            )
                                        }):<h2 className={"text-red-600"}>No Meals matched the request</h2>
                                    }
                                </div>
                            </div>
                            <Banner bannerState={bannerState.state} bannerBgColor={bannerState.bgColor} bannerMessage={bannerState.message}/>
                        </div>
                        
                    )
                }
            </Await>
        </Suspense>
    )

}

export default AllMenuProducts