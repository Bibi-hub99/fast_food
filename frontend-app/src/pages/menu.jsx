import {Outlet} from "react-router-dom"
import Categories from "../components/categories"

function Menu(){

    return (
        <div>
            <Categories/>
            <Outlet/>
        </div>
    )

}

export default Menu