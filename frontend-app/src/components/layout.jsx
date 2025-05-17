import Navbar from "./navbar"
import {Outlet,useMatch,useNavigate} from "react-router-dom"
import {useState,useEffect} from "react"
import Modal from "./modal"
import Input from "./input"
import Button from "./button"

function Layout(){

    const match = useMatch("/")
    const navigate = useNavigate()
    const [searchInput,setSearchInput] = useState("")
    const [searchTerm,setSearchTerm] = useState("")
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

    return (
        <div>
            <Navbar 
            inputValue={searchInput}
             inputChange={handleChange} 
             handleSearch={handleSearch}
             showSearchModal={showSearchModal}/>

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

        </div>
    )

}

export default Layout