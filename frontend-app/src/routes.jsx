import {createBrowserRouter} from "react-router-dom"
import Layout from "./components/layout"
import Home from './pages/home'
import Menu from "./pages/menu"

import {getAllProducts} from "./http"

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
    }
])

export default routes