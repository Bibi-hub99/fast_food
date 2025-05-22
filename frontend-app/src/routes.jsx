import {createBrowserRouter} from "react-router-dom"
import {lazy,Suspense} from "react"
import Layout from "./components/layout"
import Home from './pages/home'
import SingleProduct from "./pages/singleProduct"
import AllMenuProducts from "./pages/all-menu-products"
import SearchResults from "./pages/search-results"
import Spinner from "./components/suspense-fallback"

import {getAllProducts} from "./http"

const LazyAboutProduct = lazy(()=>import("./pages/productAbout"))
const LazyProductInfo = lazy(()=>import("./pages/productInformation"))
const LazySimilarProducts = lazy(()=>import("./pages/similarProducts"))
const LazyCategory = lazy(()=>import("./pages/category"))
const LazyMenu = lazy(()=>import("./pages/menu"))
const LazySingleCategory = lazy(()=>import("./pages/single-category"))
const LazySimilarCategory = lazy(()=>import("./pages/similarCategory"))


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
                element:(
                    <Suspense fallback={<Spinner/>}>
                        <LazyMenu/>
                    </Suspense>
                ),
                children:[
                    {
                        index:true,
                        loader:getAllProducts,
                        element:<AllMenuProducts/>
                    },
                    {
                        path:"categories",
                        element:(
                            <Suspense fallback={<Spinner/>}>
                                <LazyCategory/>
                            </Suspense>
                        )
                    }
                ]
            },

   
        ]
    },
    {
        path:"menu/categories/category/:productID",
        element:(
            <Suspense fallback={<Spinner/>}>
                <LazySingleCategory/>
            </Suspense>
        ),
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
                        <LazySimilarCategory/>
                    </Suspense>
                )
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
    },
    {
        path:"search",
        element:<SearchResults/>
    }
])

export default routes