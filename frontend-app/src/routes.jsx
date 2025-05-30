import {createBrowserRouter} from "react-router-dom"
import {lazy,Suspense} from "react"
import Layout from "./components/layout"
import Home from './pages/home'
import SingleProduct from "./pages/singleProduct"
import AllMenuProducts from "./pages/all-menu-products"
import SearchResults from "./pages/search-results"
import Spinner from "./components/suspense-fallback"
import Admin from "./pages/admin"
import AdminHome from "./pages/admin-home"
import AddProductPage from "./pages/admin-addProduct"
import Orders from './pages/orders'

import {getAllProducts,getAllOrders} from "./http"

const LazyAboutProduct = lazy(()=>import("./pages/productAbout"))
const LazyProductInfo = lazy(()=>import("./pages/productInformation"))
const LazySimilarProducts = lazy(()=>import("./pages/similarProducts"))
const LazyCategory = lazy(()=>import("./pages/category"))
const LazyMenu = lazy(()=>import("./pages/menu"))
const LazySingleCategory = lazy(()=>import("./pages/single-category"))
const LazySimilarCategory = lazy(()=>import("./pages/similarCategory"))
const LazySearchSingle = lazy(()=>import("./pages/search-single"))
const LazySingleAbout = lazy(()=>import("./pages/search-singleAbout"))
const LazySingleInformation = lazy(()=>import("./pages/search-singleInformation"))
const LazySingleSimilar = lazy(()=>import("./pages/search-singleSimilar"))
const LazyFavorites = lazy(()=>import("./pages/favorites"))
const LazyCart = lazy(()=>import("./pages/cart"))
const LazyCheckout = lazy(()=>import("./pages/checkout"))
const LazyOrders = lazy(()=>import("./pages/orders"))

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
            {
                path:'favorites',
                loader:()=>{
                    return JSON.parse(localStorage.getItem("my-favorite-food"))
                },
                element:(
                    <Suspense fallback={<Spinner/>}>
                        <LazyFavorites/>
                    </Suspense>
                )
            },
            {
                path:"cart",
                loader:()=>{
                    return JSON.parse(localStorage.getItem("my-cart-food"))
                },
                element:(
                    <Suspense>
                        <LazyCart/>
                    </Suspense>
                )
            },
            {
                path:"cart/checkout",
                element:(
                    <Suspense fallback={<Spinner/>}>
                        <LazyCheckout/>
                    </Suspense>
                )
            }
   
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
    },
    {
        path:"search/:productID",
        element:(
            <Suspense fallback={<Spinner/>}>
                <LazySearchSingle/>
            </Suspense>
        ),
        children:[
            {
                index:true,
                element:(
                    <Suspense fallback={<Spinner/>}>
                        <LazySingleAbout/>
                    </Suspense>
                )
            },
            {
                path:"information",
                element:(
                    <Suspense fallback={<Spinner/>}>
                        <LazySingleInformation/>
                    </Suspense>
                )
            },
            {
                path:"similar-products",
                element:(
                    <Suspense fallback={<Spinner/>}>
                        <LazySingleSimilar/>
                    </Suspense>
                )
            }
        ]
    },
    {
        path:"admin",
        element:<Admin/>,
        children:[
            {
                index:true,
                element:<AdminHome/>,
                loader:getAllProducts
            },
            {
                path:"add-product",
                element:<AddProductPage/>
            },
            {
                path:'orders',
                loader:getAllOrders,
                element:(
                    <Suspense fallback={<Spinner/>}>
                        <LazyOrders/>
                    </Suspense>
                )
            }
        ]
    }
])

export default routes