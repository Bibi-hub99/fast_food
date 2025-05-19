import {createContext,useContext} from "react"
import { CiSearch } from "react-icons/ci";
import { HiMiniBars3 } from "react-icons/hi2";
import { MdOutlineClear } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa6";


const MyContext = createContext()

const contextValue = {
    navbarLinks:[

        {
            id:1,
            title:"Menu",
            url:"menu"
        },
        {
            id:2,
            title:"Favorites",
            url:"favorites"
        },
        {
            id:3,
            title:"Blog",
            url:"blog"
        },
        {
            id:4,
            title:"Cart",
            url:"cart"
        },
    ],
    searchIcon:<CiSearch className={'inline'}/>,
    barsIcon:<HiMiniBars3 className={'inline'}/>,
    clearIcon:<MdOutlineClear className={'inline'}/>,
    heartIcon:<FaHeart className={'inline'}/>,
    cartIcon:<FaCartPlus className={"inline"}/>,
    likeIcon:<FaThumbsUp className={'inline'}/>,
    dislikeIcon:<FaThumbsDown className={'inline'}/>
}

export const useMyContext = ()=>{
    return useContext(MyContext)
}

function Context({children}){
    return (
     <MyContext.Provider value={contextValue}>
        {children}
     </MyContext.Provider>   
    )
}

export default Context