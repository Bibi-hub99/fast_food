import axios from "axios"
import {defer} from "react-router-dom"

const baseURL = import.meta.env.VITE_BASE_URI

export const getAllProducts = ()=>{
    const request = axios.get(`${baseURL}/products`)
    return defer({response:request})
}