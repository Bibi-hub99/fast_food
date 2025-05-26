import {useSearchParams} from "react-router-dom"
import {findByCategory} from "../http"
import {useState,useEffect} from "react"
import {useMyContext} from "../context"
import ProductCard from "../components/productCard"
import Banner from "../components/banner"

function Category(){

    const {foodCategories} = useMyContext()

    const [searcher,setSearcher] = useSearchParams()
    const [meals,setMeals] = useState([])
    const [myCart,setMyCart] = useState(JSON.parse(localStorage.getItem("my-cart-food")) || [])
    const [myFavs,setMyFavs] = useState(JSON.parse(localStorage.getItem("my-favorite-food")) || [])
    const [bannerState,setBannerState] = useState({
        state:false,
        message:"",
        bgColor:'red'
    })
    const query = searcher.get("query")
    const limit = searcher.get("limit")

    const handleBanner = ({state,message,bgColor})=>{
        setBannerState((oldValue)=>{
            return {
                state:state,
                message:message,
                bgColor:bgColor
            }
        })
    }

    useEffect(()=>{

        const fetchByCategory = async({query,limit})=>{
            let response;
            try{

                if(query === 'fast-food'){
                    response = await findByCategory({query:"fast food",limit:limit})
                }else{

                    const findMatch = foodCategories.find((each)=>{
                        return each.url_query.toLowerCase() === query.toLowerCase()
                    })
                
                    if(!findMatch){
                        throw "invalid url"
                    }else{
                        response = await findByCategory({query:findMatch.title.toLowerCase(),limit:limit})
                    }

                }
                setMeals(response)

            }catch(err){
                console.log(err)
            }

        }
        
        fetchByCategory({query,limit})

    },[searcher])


   const addToCart = (_id)=>{

        const findInCategories = meals.find((each)=>{
            return each._id === _id
        })

        if(myCart.length < 1){

            setMyCart((oldValue)=>{
                return [
                    ...oldValue,
                    {...findInCategories}
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
                        {...findInCategories}
                    ]
                })
                handleBanner({state:true,message:'added to cart',bgColor:'green'})
                setTimeout(()=>handleBanner({state:false,message:"",bgColor:""}),2000)
            }else{
                handleBanner({state:true,message:"already exist in cart",bgColor:'red'})
                setTimeout(()=>handleBanner({state:false,message:"",bgColor:""}),2000)
            }

        }

    }

    const addToFavs = (_id)=>{

        const findInCategories = meals.find((each)=>{
            return each._id === _id
        })

        if(myFavs.length < 1){

            setMyFavs((oldValue)=>{
                return [
                    ...oldValue,
                    {...findInCategories}
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
                    return [
                        ...oldValue,
                        {...findInCategories}
                    ]
                })
                handleBanner({state:true,message:"added to favorites",bgColor:'green'})
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
        <div>
            <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"}>
                {
                    meals.length > 0 ? meals.map((each)=>{
                        return (
                            <ProductCard
                            key={`categories${each._id}`}
                            cardStyle={"border-2 rounded-md border-white text-white hover:text-orange-500 hover:border-orange-500"}
                            mealID={`category/${each._id}?query=${query}`}
                            imageURL={each.imageURL}
                            mealName={each.name}
                            mealPrice={each.price}
                            meal_id={each._id}
                            addToCart={addToCart}
                            addToFavs={addToFavs}
                            byPass={true}
                            />
                        )
                    }):(<div>
                            {<p className={"text-red-700 mt-20 text-center text-[2rem]"}>No Meals Available for this category</p>}
                        </div>)
                }
            </div>
            <Banner bannerState={bannerState.state} bannerBgColor={bannerState.bgColor} bannerMessage={bannerState.message}/>
        </div>
    )


}

export default Category