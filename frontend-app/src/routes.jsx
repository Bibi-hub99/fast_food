import {createBrowserRouter} from "react-router-dom"
import Layout from "./components/layout"
import Home from './pages/home'

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
                path:'/about',
                element:<h1>ABout</h1>
            }
        ]
    }
])

export default routes