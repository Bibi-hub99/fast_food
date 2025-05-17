import Navbar from "./navbar"
import {Outlet,useMatch,useNavigate} from "react-router-dom"
import {useState} from "react"
import Modal from "./modal"
import SlideMenu from "./slide-menu"
function Layout(){

    const match = useMatch("/")
    const navigate = useNavigate()
    const [searchInput,setSearchInput] = useState("")
    const [slideWidth,setSlideWidth] = useState("0")
    const [modalState,setModalState] = useState(false)

    const isHome = match !== null ? 'mt-0':'mt-20 md:mt-22 w-[97%] m-auto'

    const handleChange = (evt)=>{
        const {value} = evt.target;
        setSearchInput(value)
    }

    console.log(searchInput)

    const handleSearch = (evt)=>{
        evt.preventDefault()
        if(searchInput.trim() !== ""){
            navigate(`search?query=${searchInput}`)
        }
    }

    const showSearchModal = ()=>{
        setModalState(true)
    }

    const hideSearchModal = ()=>{
        setModalState(false)
    }

    const showSlideMenu = ()=>{
        setSlideWidth('100%')
    }

    const hideSlideMenu = ()=>{
        setSlideWidth('0%')   
    }

    return (
        <div>
            <Navbar 
            inputValue={searchInput}
             inputChange={handleChange} 
             handleSearch={handleSearch}
             showSearchModal={showSearchModal}
             showSlideMenu={showSlideMenu}/>

            <div className={isHome}>
                <Outlet/>
            </div>
            <Modal 
            modalStyle={'md:hidden'} 
            modalOpen={modalState}  
            inputValue={searchInput} 
            inputChange={handleChange}
            handleSearch={handleSearch}
            hideSearchModal={hideSearchModal}
            />
            <SlideMenu width={slideWidth} hideSlideMenu={hideSlideMenu}/>

        </div>
    )

}

export default Layout