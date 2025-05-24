import axios from "axios"
import {defer} from "react-router-dom"

const baseURL = import.meta.env.VITE_BASE_URI

export const getAllProducts = ()=>{
    const request = axios.get(`${baseURL}/products`)
    return defer({response:request})
}

export const getSingleProduct = async (productID)=>{
    try{
        const {data} = await axios.get(`${baseURL}/products/product/${productID}`)
        return {meals:data.meals,similarMeals:data.similarProducts}
    }catch(err){
        console.log(err)
    }
}

export const getProductData = async(productID)=>{
    try{
        const {data} = await axios.get(`${baseURL}/product-data/${productID}`)
        return data.productData
    }catch(err){
        console.log(err)
    }
}

export const likeProduct = async (productDataID)=>{
    try{
        const {data} = await axios.put(`${baseURL}/product-data/${productDataID}/like`)
        return data.meal
    }catch(err){
        console.log(err)
    }
}

export const dislikeProduct = async (productDataID)=>{

    try{
        const {data} = await axios.put(`${baseURL}/product-data/${productDataID}/dislike`)
        return data.meal
    }catch(err){
        console.log(err)
    }

}

export const addComment = async({productDataID,productComment})=>{
    try{
        const {data} = await axios.put(`${baseURL}/product-data/${productDataID}/comment`,{
            productComment
        })
        return data.meal
    }catch(err){
        console.log(err)
    }
}

export const findByCategory = async({query,limit})=>{
    try{
        const response = await axios.get(`${baseURL}/products/categories?query=${query}&limit=${limit}`)
        return response.data.meals
    }catch(err){
        console.log()
    }
}

export const querySearch = async({
    searchTerm,
    minPriceStart,minPriceEnd,
    midPriceStart,midPriceEnd,
    highPriceStart,highPriceEnd,
    limit
})=>{
    try{
        const query = `${baseURL}/products/search?searchTerm=${searchTerm}&minPriceStart=${minPriceStart}&minPriceEnd=${minPriceEnd}&midPriceStart=${midPriceStart}&midPriceEnd=${midPriceEnd}&highPriceStart=${highPriceStart}&highPriceEnd=${highPriceEnd}&limit=${limit}`
        const {data} = await axios.get(query)
        return data.meals
    }catch(err){
        console.log(err.message)
    }
}

export const updateProduct = async ({_id,name,imageURL,price,description,category,tags,locations})=>{
    try{
        const {data} = await axios.put(`${baseURL}/products/product/${_id}/update`,{
            name,
            imageURL,
            price,
            description,
            category,
            tags,
            locations
        })

        return data.meals
        
    }catch(err){
        console.log(err)
    }
}

export const addProduct = async({name,imageURL,price,description,category,tags,locations})=>{

    try{

        const response = await axios.post(`${baseURL}/products/add-product`,{
           name,
           imageURL,
           price,
           description,
           category,
           tags,
           locations 
        })

    }catch(err){
        console.log(err)
    }

}