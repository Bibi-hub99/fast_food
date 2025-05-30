import {createContext,useContext} from "react"
import { CiSearch } from "react-icons/ci";
import { HiMiniBars3 } from "react-icons/hi2";
import { MdOutlineClear } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa6";
import { CgMenuGridO } from "react-icons/cg";
import { MdClear } from "react-icons/md";
import { FaPenAlt } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineMinus } from "react-icons/hi2";
import { TiTick } from "react-icons/ti";
import { MdError } from "react-icons/md";
import { FaCcMastercard } from "react-icons/fa";


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
    foodCategories:[
        {
            id:1,
            title:"Cooked",
            url_query:"cooked"
        },
        {
            id:2,
            title:"Baked",
            url_query:"baked"
        },
        {
            id:3,
            title:"Drinks",
            url_query:"drinks"
        },
        {
            id:4,
            title:"Healthy",
            url_query:"healthy"
        },
        {
            id:5,
            title:"Coffee",
            url_query:'coffee'
        },
        {
            id:6,
            title:"Dessert",
            url_query:"dessert"
        }
    ],
    filters:[
        {
            id:1,
            text:"R0 - R100",
            title:"min",
            priceRangeStart:0,
            priceRangeEnd:100,
            isChecked:false
        },
        {
            id:2,
            text:"R101 - R200",
            title:"mid",
            priceRangeStart:101,
            priceRangeEnd:200,
            isChecked:false
        },
        {
            id:3,
            text:"R201 - R300",
            title:"high",
            priceRangeStart:201,
            priceRangeEnd:300,
            isChecked:false
        }
    ],
    sorters:[
        {
            id:1,
            title:'name',
            name:'sorter',
            isChecked:false
        },
        {
            id:2,
            title:'price',
            name:'sorter',
            isChecked:false
        },
        {
            id:3,
            title:'relevance',
            name:'sorter',
            isChecked:false
        },
        {
            id:4,
            title:'availability',
            name:'sorter',
            isChecked:false
        }
    ],
    searchIcon:<CiSearch className={'inline'}/>,
    barsIcon:<HiMiniBars3 className={'inline'}/>,
    heartIcon:<FaHeart className={'inline'}/>,
    cartIcon:<FaCartPlus className={"inline"}/>,
    likeIcon:<FaThumbsUp className={'inline'}/>,
    dislikeIcon:<FaThumbsDown className={'inline'}/>,
    sortIcon:<CgMenuGridO className={"inline"}/>,
    clearIcon:<MdClear/>,
    penIcon:<FaPenAlt/>,
    binIcon:<ImBin className={'inline'}/>,
    plusIcon:<IoMdAdd className={"inline"}/>,
    minusIcon:<HiOutlineMinus className={'inline'}/>,
    tickIcon:<TiTick className={'text-green-600 inline'}/>,
    errorIcon:<MdError className={'text-red-600 inline'}/>,
    masterCard:<FaCcMastercard className={'inline'}/>,
    saveCart:function(keyName,value){
        const convertJSON = JSON.stringify(value)
        localStorage.setItem(keyName,convertJSON)
    }
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