import {useState,useEffect,Suspense} from "react"
import {useLoaderData,Await} from "react-router-dom"
import Spinner from "../components/suspense-fallback"
import AdminCard from "../components/adminCard"
import AdminModal from "../components/adminModal"
import Tag from "../components/tag"
import {updateProduct} from "../http"

function AdminHome(){

    const {response} = useLoaderData()
    const [meals,setMeals] = useState([])
    const [modalProduct,setModalProduct] = useState({})
    const [modifyModal,setModifyModal] = useState(false)
    const [tagText,setTagText] = useState("")
    const [locationText,setLocationText] = useState("")

    const removeTag = (text)=>{

        const findTag = modalProduct.tags.findIndex((each)=>{
            return each === text
        })

        setModalProduct((oldValue)=>{
            const {tags} = oldValue
            return {
                ...oldValue,
                tags:[...tags.slice(0,findTag),...tags.slice(findTag+1)]
            }
        })
        
    }
    
    const removeLocation = (text)=>{

        const findLocation = modalProduct.locations.findIndex((each)=>{
            return each.town === text
        })


        setModalProduct((oldValue)=>{

            const {locations} = oldValue

            return {
                ...oldValue,
                locations:[...locations.slice(0,findLocation),...locations.slice(findLocation+1)]
            }
        })

    }

    const typeTags = modalProduct.tags ? modalProduct.tags.map((each)=>{
        return (
            <Tag key={`tags${each}`} title={each} handleTags={removeTag}/>
        )
    }):<p></p>

    const locationTags = modalProduct.tags ? modalProduct.locations.map((each)=>{
        return (
            <Tag key={`locations${each.town}`} title={each.town} handleTags={removeLocation}/>
        )
    }):<p></p>


    const openModifyModal = (id)=>{
        const findProduct = meals.find((each)=>each._id === id)
        setModalProduct(findProduct)
        setModifyModal(true)
        
    }

    const closeModifyModal = ()=>{
        setModifyModal(false)
        setTagText("")
        setLocationText("")
    }

    const handleChange = (evt)=>{
        const {name,value} = evt.target;
        setModalProduct((oldValue)=>{
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

            const findSimilar = modalProduct.tags.find((each)=>{
                return each.toLowerCase() === text.toLowerCase()
            })

            if(!findSimilar){
                setModalProduct((oldValue)=>{
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


    const addLocation = (text)=>{
        if(text){

            const findSimilar = modalProduct.locations.find((each)=>{
                return each.town.toLowerCase() === text.toLowerCase()
            })

            console.log(text)

            if(!findSimilar){
                setModalProduct((oldValue)=>{
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

    const productUpdate = async(evt)=>{
        evt.preventDefault()
        try{
            const response = await updateProduct(modalProduct)
            console.log(response)
            setMeals(response)
        }catch(err){
            console.log(err)
        }
        closeModifyModal()
    }


    return (
        <Suspense fallback={<Spinner/>}>
            <Await resolve={response}>
                {
          
                    (data)=>(
                        
                        <div>
                            <div className={'text-white gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}>
                                {
                                    useEffect(()=>{
                                        setMeals(data.data.meals)
                                    },[])
                                }
                                {
                                    meals.map((each)=>{
                                        return (
                                            <AdminCard key={`admincard${each._id}`}
                                            imageURL={each.imageURL} 
                                            imageStyle={"h-full w-full object-cover rounded-md"}
                                            name={each.name}
                                            price={each.price}
                                            meal_id={each._id}
                                            viewProduct={openModifyModal}/>
                                        )
                                    })
                                }
                            </div>
                            <AdminModal 
                            openModify={modifyModal} 
                            closeModifyModal={closeModifyModal}
                            name={modalProduct["name"]}
                            imageURL={modalProduct["imageURL"]}
                            price={modalProduct["price"]}
                            description={modalProduct["description"]}
                            category={modalProduct["category"]}
                            typeTags={typeTags}
                            locationTags={locationTags}
                            handleChange={handleChange}
                            tagText={tagText}
                            locationText={locationText}
                            handleTagText={handleTagText}
                            handleLocationText={handleLocationText}
                            addTag={addTag}
                            addLocation={addLocation}
                            productUpdate={productUpdate}
                            />
                        </div>
                    )
                }
            </Await>
        </Suspense>        
    )

}

export default AdminHome