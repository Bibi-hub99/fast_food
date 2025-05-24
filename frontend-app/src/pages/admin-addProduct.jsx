import ProductForm from "../components/productForm"
import {useState} from "react"
import Tag from "../components/tag"

function AddProductPage(){

    const [tagText,setTagText] = useState("")
    const [locationText,setLocationText] = useState("")
    const [productInfo,setProductInfo] = useState({
        name:"",
        imageURL:"",
        price:"",        
        description:"",
        category:"",
        tags:[],
        locations:[]
    })


    return (
        <div>
            <ProductForm
            formStyle={'rounded-b-md md:w-[80%] md:left-[10%] lg:w-[60%] lg:left-[20%] xl:w-[50%] xl:left-[25%] relative'}
            formTitle={"Fill product information"}
            btnInnerText={"Add Product"}

            name={productInfo.name}
            imageURL={productInfo.imageURL}
            price={productInfo.price}
            description={productInfo.description}
            category={productInfo.category}
            />
        </div>
    )

}

export default AddProductPage