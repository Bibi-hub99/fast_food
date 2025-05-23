import {NavLink,useSearchParams,useParams,Outlet,Link} from "react-router-dom"
import {useState,useEffect} from "react"
import {useMyContext} from "../context"
import {getSingleProduct,getProductData} from "../http"
import Spinner from "../components/suspense-fallback"
import ParamButton from "../components/param-button"
import ImageDisplayer from "../components/image"

function SearchSingle(){

    const {heartIcon,cartIcon} = useMyContext()
    const [searcher,setSearcher] = useSearchParams()
    const {productID} = useParams()
    const [singleMeal,setSingleMeal] = useState({})
    const [similarMeals,setSimilarMeals] = useState([])
    const [productData,setProductData] = useState({})
    const [isLoading,setIsLoading] = useState(false)
    const query = searcher.get("query")
    console.log(query)
    
    const normalLink = 'w-[30%] block py-2 text-center rounded-t-md font-extrabold'
    const hoverAndNormal = 'hover:text-orange-500 hover:bg-gray-300 '+normalLink
    const activeLink = 'bg-orange-500 '+normalLink

    useEffect(()=>{
        const fetchSingleProduct = async(productID)=>{
            const response = await getSingleProduct(productID)
            if(response){
                setSingleMeal(response.meals)
                setSimilarMeals(response.similarMeals)
            }
        }

        const fetchProductData = async(productID)=>{
            try{
                const response = await getProductData(productID)
                setProductData(response)
            }catch(err){
                console.log(err)
            }
        }
        const fetchAll = async ()=>{
            setIsLoading(true)
            await fetchProductData(productID)
            await fetchSingleProduct(productID)
            setIsLoading(false)
        }

        fetchAll()
        
    },[productID])    

    if(isLoading){
        return (
            <Spinner/>
        )
    }

    return (
        <div>

            <div className={'w-[97%] m-auto'}>
                <div className={'h-[20rem] border-2 border-red-600 mt-1 rounded-md box-border md:h-[30rem] relative'}>
                    <Link to={`..?query=${query}`} relative={"path"} className={'bg-orange-500 px-5 py-1 rounded-md absolute top-1 left-1 hover:text-white'}>Back</Link>
                    <ImageDisplayer imageURL={singleMeal.imageURL} imageStyle={'h-full w-full object-cover rounded-md'}/>
                    <div className={'absolute top-0 right-2'}>
                        <ParamButton
                        btnInnerText={heartIcon}
                        btnStyle={'text-2xl mr-[1rem] md:mr-[1.5rem] md:text-3xl cursor-pointer'}/>

                        <ParamButton
                        btnInnerText={cartIcon}
                        btnStyle={'text-2xl md:text-3xl cursor-pointer'}/>
                    </div>
                </div>
                <div className={'text-white flex justify-between mt-2'}>

                    <NavLink to={`.?query=${query}`} className={({isActive}) => isActive ? activeLink:hoverAndNormal} end>About</NavLink>
                    <NavLink to={`information?query=${query}`} className={({isActive}) => isActive ? activeLink:hoverAndNormal}>Information</NavLink>
                    <NavLink to={`similar-products?query=${query}`} className={({isActive}) => isActive ? activeLink:hoverAndNormal}>You might like</NavLink>

                </div>
                <hr className={'bg-orange-500 py-[.1rem] -mt-[.1rem]'}></hr>
                <div className={'pt-5 mb-5'}>
                    <Outlet context={[productData,setProductData,singleMeal,similarMeals]}/>
                </div>
            </div>            
            
        </div>
    )

}

export default SearchSingle