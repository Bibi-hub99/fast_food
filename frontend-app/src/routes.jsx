import {createBrowserRouter} from "react-router-dom"
import {lazy,Suspense} from "react"
import Layout from "./components/layout"
import Home from './pages/home'
import Menu from "./pages/menu"
import SingleProduct from "./pages/singleProduct"
import Spinner from "./components/suspense-fallback"

import {getAllProducts} from "./http"

const LazyAboutProduct = lazy(()=>import("./pages/productAbout"))
const LazyProductInfo = lazy(()=>import("./pages/productInformation"))
const LazySimilarProducts = lazy(()=>import("./pages/similarProducts"))

const routes = createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:"menu",
                loader:getAllProducts,
                element:(
                    <Suspense fallback={<Spinner/>}>
                        <Menu/>
                    </Suspense>
                ),
            }
   
        ]
    },
    {
        path:"menu/:productID",
        element:<SingleProduct/>,
        children:[
            {
                index:true,
                element:(
                    <Suspense fallback={<Spinner/>}>
                        <LazyAboutProduct/>
                    </Suspense>
                )
            },
            {
                path:"information",
                element:(
                    <Suspense fallback={<Spinner/>}>
                        <LazyProductInfo/>
                    </Suspense>
                )
            },
            {
                path:"similar-products",
                element:(
                    <Suspense fallback={<Spinner/>}>
                        <LazySimilarProducts/>
                    </Suspense>
                )
            }
        ]
    }
])

export default routes