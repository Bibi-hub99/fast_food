import ProductForm from "../components/productForm"
import {useState} from "react"
import Tag from "../components/tag"
import {addProduct} from "../http"

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


    const handleChange = (evt)=>{
        const {name,value} = evt.target;
        setProductInfo((oldValue)=>{
            return {
                ...oldValue,
                [name]:value
            }
        })
    }

    const handleTagText = (evt)=>{
        setTagText(evt.target.value)
    }

    const handleLocationText = (evt)=>{
        setLocationText(evt.target.value)
    }

    const addTag = (text)=>{

        if(text){
            const findSimilar = productInfo.tags.find((each)=>{
                return each.toLowerCase() === text.toLowerCase()
            })
            if(!findSimilar){
                setProductInfo((oldValue)=>{
                    const {tags} = oldValue
                    return {
                        ...oldValue,
                        tags:[...tags,text]
                    }
                })
                setTagText("")
            }
        }

    }

    const removeTag = (id)=>{

        const findTag = productInfo.tags.findIndex((each)=>{
            return each.toLowerCase() === id.toLowerCase()
        })

        setProductInfo((oldValue)=>{
            const {tags} = oldValue
            return {
                ...oldValue,
                tags:[...tags.slice(0,findTag),...tags.slice(findTag+1)]     
            }
        })

    }

    const addLocation = (text)=>{

        if(text){

            const findSimilar = productInfo.locations.find((each)=>{
                return each.town.toLowerCase() === text.toLowerCase()
            })

            if(!findSimilar){
                setProductInfo((oldValue)=>{

                    const {locations} = oldValue

                    return {
                        ...oldValue,
                        locations:[...locations,{town:text}]
                    }
                })
                setLocationText("")
            }

        }

    }

    const removeLocation = (id)=>{

        const findLocation = productInfo.locations.findIndex((each)=>{
            return each.town === id
        })

        setProductInfo((oldValue)=>{
            const {locations} = oldValue
            return {
                ...oldValue,
                locations:[...locations.slice(0,findLocation),...locations.slice(findLocation+1)]
            }

        })

    }

    const tagMaps = productInfo.tags.map((each)=>{
        return (
            <Tag title={each} key={`productTagsAdd${each}`} handleTags={removeTag}/>
        )
    })

    const locationMaps = productInfo.locations.map((each)=>{
        return (
            <Tag title={each.town} key={`locationsTagsAdd${each.town}`} handleTags={removeLocation}/>
        )
    })

    const productAdd = async(evt)=>{
        evt.preventDefault()
        try{
            const response = await addProduct(productInfo)
            console.log(response)
            setProductInfo({
                name:"",
                imageURL:"",
                price:"",
                description:"",
                category:"",
                tags:[],
                locations:[]
            })
        }catch(err){
            console.log(err)
        }
    }

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
            handleChange={handleChange}
            tagText={tagText}
            locationText={locationText}
            handleTagText={handleTagText}
            handleLocationText={handleLocationText}
            typeTags={tagMaps}
            locationTags={locationMaps}
            addTag={addTag}
            addLocation={addLocation}
            productUpdate={productAdd}
            />

        </div>
    )

}

export default AddProductPage