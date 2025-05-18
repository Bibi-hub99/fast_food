import {createBrowserRouter} from "react-router-dom"
import {lazy,Suspense} from "react"
import Layout from "./components/layout"
import Home from './pages/home'
import Menu from "./pages/menu"
import Spinner from "./components/suspense-fallback"

import {getAllProducts} from "./http"

const LazySingleProduct = lazy(()=>import("./pages/singleProduct"))

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
                element:<Menu/>,
            }
   
        ]
    },
    {
        path:"menu/:productID",
        element:(
            <Suspense fallback={<Spinner/>}>
                <LazySingleProduct/>
            </Suspense>
        )
    }
])

export default routes