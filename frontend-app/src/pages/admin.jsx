import {NavLink,Outlet} from "react-router-dom"

function Admin(){

    const activeLink = 'text-orange-500'
    const inActiveLink = 'hover:underline'

    return (
        <div>
            <div className={"bg-black py-5 text-white fixed top-0 w-full"} style={{zIndex:'20'}}>
                <div className={'w-[97%] mx-auto'}>
                    <ul className={"flex"}>
                        <li className={""}><NavLink to={'.'} end className={({isActive})=>isActive ? activeLink:inActiveLink}>Home</NavLink></li>
                        <li className={"ml-2"}><NavLink to={"add-product"} className={({isActive})=>isActive ? activeLink:inActiveLink}>Add Product</NavLink></li>
                        <li className={"ml-2"}><NavLink to={""} className={({isActive}) =>isActive ? activeLink:inActiveLink}></NavLink></li>
                    </ul>
                </div>
            </div>
            <div className={'mt-18 w-[97%] mx-auto mb-10'}>
                <Outlet/>
            </div>
        </div>
    )

}

export default Admin