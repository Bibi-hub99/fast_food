import {useSearchParams,useNavigate} from "react-router-dom"
import {useMyContext} from "../context"

import SearchNav from "../components/results-nav"
import {useState,useEffect} from "react"
import {querySearch} from "../http"
import Spinner from "../components/suspense-fallback"
import ProductCard from "../components/productCard"
import MobileFilter from "../components/mobileFilter"
import Button from "../components/button"
import Banner from "../components/banner"


function SearchResults(){

    const {filters,sorters} = useMyContext()

    const [searcher,setSearcher] = useSearchParams()
    const [searchInput,setSearchInput] = useState("")
    const [meals,setMeals] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [openFilter,setOpenFilter] = useState(false)
    const [filterState,setFilterStates] = useState(JSON.parse(sessionStorage.getItem("filter-ranges"))|| filters)
    const [sorterState,setSorterState] = useState(JSON.parse(sessionStorage.getItem("sorters")) ||sorters)
    const [myFavs,setMyFavs] = useState(JSON.parse(localStorage.getItem("my-favorite-food")) || [])
    const [myCart,setMyCart] = useState(JSON.parse(localStorage.getItem("my-cart-food")) || [])
    const [sorterCond,setSorterCond] = useState("")

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

    const query = searcher.get("query")

    const addToCart = (_id)=>{

        const findInMeals = meals.find((each)=>{
            return each._id === _id
        })

        if(myCart.length < 1){

            setMyCart((oldValue)=>{
                return [
                    ...oldValue,
                    {...findInMeals}
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
                        {...findInMeals}
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

        const findInMeals = meals.find((each)=>{
            return each._id === _id
        })

        if(myFavs.length < 1){
            setMyFavs((oldValue)=>{
                return [
                    ...oldValue,
                    {...findInMeals}
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
                    return [...oldValue,{...findInMeals}]
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
 
    useEffect(()=>{
        const queryMeals = async ()=>{
            setIsLoading(true)
            const response = await querySearch({
                searchTerm:query
            })
            if(typeof(response) !=="undefined"){
                setMeals(response)
            }
            setIsLoading(false)
        }
        queryMeals()
    },[query])

    useEffect(()=>{

        const convertFilters = JSON.stringify(filterState)
        sessionStorage.setItem("filter-ranges",convertFilters)

        searcher.set("limit",10)

        filterState.forEach((each)=>{

            const {priceRangeStart,priceRangeEnd,title} = each

            if(each.isChecked === true){

                if(title === "min"){
                    searcher.set("minPriceStart",priceRangeStart)
                    searcher.set("minPriceEnd",priceRangeEnd)
                }

                if(title === "mid"){
                    searcher.set("midPriceStart",priceRangeStart)
                    searcher.set("midPriceEnd",priceRangeEnd)
                }

                if(title === "high"){
                    searcher.set("highPriceStart",priceRangeStart)
                    searcher.set("highPriceEnd",priceRangeEnd)
                }
            }else{
                if(title === "min"){
                    searcher.delete("minPriceStart")
                    searcher.delete("minPriceEnd")
                }
                if(title === "mid"){
                    searcher.delete("midPriceStart")
                    searcher.delete("midPriceEnd")
                }
                if(title === "high"){
                    searcher.delete("highPriceStart")
                    searcher.delete("highPriceEnd")
                }
            }

        })

    },[filterState])

    console.log(filterState)

    useEffect(()=>{
        const sorterFn = (condition)=>{

            if(condition === "name"){
                const sortMeals = [...meals].sort((a,b)=>{

                    let x = a.name.toLowerCase()
                    let y = b.name.toLowerCase()

                    if(x > y){
                        return 1
                    }
                    if(x < y){
                        return -1
                    }

                    return 0

                })
                setMeals(sortMeals)
            }else if(condition === "price"){
                const sortMeals = [...meals].sort((a,b)=>a.price - b.price)
                setMeals(sortMeals)
            }

        }
        if(sorterCond.trim()!==""){
            sorterFn(sorterCond)
        }
    },[sorterCond])

    const navigate = useNavigate()

    const goBack = (num)=>{
        navigate(num)
    }

    const handleChange = (evt)=>{
        const {value} = evt.target;
        setSearchInput(value)
    }

    const handleSearch = ()=>{
        if(searchInput){
            setSearcher({
                query:searchInput
            })
        }
    }

    const toggleOpenFilter = (state)=>{
        setOpenFilter(state)
    }

    const changePriceRange = (id)=>{

        setFilterStates((oldValue)=>{
            return oldValue.map((each)=>{
                return each.id === id ? 
                {
                    ...each,
                    isChecked:!each.isChecked
                }:{...each}
            })
        })

    }

    const sorterMethod = (evt)=>{
        const {value} = evt.target
        setSorterCond(value)
    }

    const applyFilters = async()=>{

        setIsLoading(true)
        const response = await querySearch({
        
            searchTerm:query,
            minPriceStart:searcher.get("minPriceStart") || "undefined",
            minPriceEnd:searcher.get("minPriceEnd") || "undefined",
            midPriceStart:searcher.get("midPriceStart") || "undefined",
            midPriceEnd:searcher.get("midPriceEnd") || "undefined",
            highPriceStart:searcher.get("highPriceStart") || "undefined",
            highPriceEnd:searcher.get("highPriceEnd") || "undefined",
            limit:10
        })
        setIsLoading(false)
        if(typeof(response) !== "undefined"){
            setMeals(response)
        }

    }

    const filterMaps = filterState.map((each)=>{

        return (
            <li key={`mobiFilters${each.id}`}>
                <input type={"checkbox"} name={each.title} id={`check${each.id}`} checked={each.isChecked ? true:false} onChange={()=>changePriceRange(each.id)}></input>
                <label htmlFor={`check${each.id}`}> {each.text}</label>
            </li>
        )
    })

    const sorterMaps = sorterState.map((each)=>{
        return (
            <li key={`sorters${each.id}`}>
                <input type={'radio'} name={each.name} id={`radio${each.id}`} value={each.title} onChange={sorterMethod}></input>
                <label htmlFor={`radio${each.id}`} className={`capitalize`}> {`sort by ${each.title}`}</label>
            </li>
        )
    })


    if(isLoading){
        return <Spinner/>
    }

    console.log(meals)

    return (
        <div>
            <div className={"fixed top-0 w-full"}>
                <SearchNav 
                goBack={goBack} 
                num={-1} 
                searchInput={searchInput} 
                handleChange={handleChange}
                handleSearch={handleSearch}
                toggleOpenFilter={toggleOpenFilter}
                state={true}/>
            </div>
            <div className={"flex flex-col md:flex-row my-20 text-white w-[97%] mx-auto md:justify-between items-start"}>

                <div className={"hidden md:w-[20%] lg:w-[15%] xl:w-[14%] md:block rounded-md py-1 px-1 fixed"}>
                    <p>Filter</p>
                    <hr className={"h-[.1rem] border-none bg-white"}></hr>
                    <Button
                    btnInnerText={"Apply"}
                    btnStyle={"my-2 bg-orange-500 px-1 py-1 rounded-md cursor-pointer"}
                    handleClick={applyFilters}/>
                    <ul>
                        {filterMaps}
                    </ul>
                    <ul className={'mt-3'}>
                        {sorterMaps}
                    </ul>
                </div>

                <div className={"w-[100%] md:w-[75%] md:ml-[24%] lg:w-[80%] lg:ml-[19%] xl:w-[84%] xl:ml-[16%] rounded-md py-1 px-1 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"}>
                    {
                        meals.length > 0 ? meals.map((each)=>{
                            return (
                                <ProductCard
                                key={`results${each._id}`}
                                cardStyle={"border-2 rounded-md text-white hover:text-orange-500 hover:border-orange-500"}
                                mealID={`${each._id}?query=${query}`}
                                imageURL={each.imageURL}
                                mealName={each.name}
                                mealPrice={each.price}
                                meal_id={each._id}
                                addToCart={addToCart}
                                addToFavs={addToFavs}
                                byPass={true}
                                />
                            )
                        }):(
                            <div>
                                {<p>No available products for this search</p>}
                            </div>
                        )
                    }

                </div>

            </div>
            {openFilter && <MobileFilter state={false} toggleOpenFilter={toggleOpenFilter} filterMaps={filterMaps} sorterMaps={sorterMaps} applyFilters={applyFilters}/>}
            <div>

            </div>
            <Banner bannerState={bannerState.state} bannerBgColor={bannerState.bgColor} bannerMessage={bannerState.message}/>

        </div>
    )

}

export default SearchResults