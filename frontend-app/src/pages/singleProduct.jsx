import {Link,useParams} from "react-router-dom"
import {useMyContext} from "../context"
import {useEffect,useState} from "react"
import {getSingleProduct} from "../http"
import Spinner from "../components/suspense-fallback"
import ParamButton from "../components/param-button"


import ImageDisplayer from "../components/image"

function SingleProduct(){

    const {heartIcon,cartIcon} = useMyContext()

    const {productID} = useParams()
    const [singleMeal,setSingleMeal] = useState({})
    const [isLoading,setIsLoading] = useState(false)

    console.log(singleMeal)

    useEffect(()=>{
        const fetchSingleProduct = async(productID)=>{
            setIsLoading(true)
            const response = await getSingleProduct(productID)
            if(response){
                setSingleMeal(response)
            }
            setIsLoading(false)
        }
        fetchSingleProduct(productID)
    },[])

    if(isLoading){
        return (
            <Spinner/>
        )
    }

    return(
        <div className={'w-[97%] m-auto'}>
            <div className={'h-[20rem] border-2 border-red-600 mt-1 rounded-md box-border md:h-[30rem] relative'}>
                <Link to={'..'} relative={"path"} className={'bg-orange-500 px-5 py-1 rounded-md absolute top-1 left-1 hover:text-white'}>Back</Link>
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
        </div>
    )

}

export default SingleProduct