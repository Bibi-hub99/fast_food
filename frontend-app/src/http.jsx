import axios from "axios"
import {defer} from "react-router-dom"

const baseURL = import.meta.env.VITE_BASE_URI

export const getAllProducts = ()=>{
    const request = axios.get(`${baseURL}/products`)
    console.log(request)
    return defer({response:request})
}

export const getSingleProduct = async (productID)=>{
    try{
        const {data} = await axios.get(`${baseURL}/products/product/${productID}`)
        return data.meals
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