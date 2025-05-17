import Button from "./button"
import {useMyContext} from "../context"
import {NavLink} from "react-router-dom"
import Input from "./input"

function Navbar(props){

    const {navbarLinks,searchIcon,barsIcon} = useMyContext()

    const justLink = 'hover:underline'
    const activeLink = 'text-orange-500'


    const navbarLinkMap = navbarLinks.map((each)=>{
        return (
            <li key={`navbarLinks${each.id}`} className={'ml-3'}><NavLink to={each.url} className={({isActive}) => isActive ? activeLink:justLink}>{each.title}</NavLink></li>
        )
    })


    return (
        <div className={'bg-black shadow-md text-white py-4 font-bold fixed w-full top-0'}>
            <div className={'flex w-[97%] m-auto items-center'}>
                <div className={'md:w-[20%]'}>
                    <h1>Food App</h1>
                </div>
                <div className={'hidden w-[80%] md:flex items-center'}>
                    <ul className={'flex w-[60%] lg:justify-between lg:w-[40%]'}>
                        <li className={'ml-3 lg:block lg:ml-0'}><NavLink to={'.'} className={({isActive})=> isActive ? activeLink:justLink}>Home</NavLink></li>
                        {navbarLinkMap}
                    </ul>
                    <form className={"inline-block ml-auto lg:ml-5 w-[40%] lg:w-[60%]"} autoComplete={'off'} name={'search-form'}>
                        <div className={'lg:w-[80%] xl:w-[70%] relative'}>
                            <Input 
                            inputType={'text'} 
                            inputStyle=
                            {'w-full py-2 pl-2 pr-13 box-border border-gray-200 outline-none border-2 rounded-md'}
                            inputHolder={"Search..."}
                            inputID={'search-input'}
                            inputChange={props.inputChange}
                            inputValue={props.searchInput}
                            />
                            <Button 
                            btnInnerText={searchIcon}
                            btnType={'button'}
                            handleClick={props.handleSearch}
                            btnStyle=
                            {'absolute right-1 top-[10%] rounded-md text-2xl bg-orange-500 px-2 h-[80%] text-white text-center cursor-pointer font-extrabold'}/>
                        </div>
                    </form>
                </div>
                <div className={'ml-auto md:hidden'}>
                    <Button 
                    btnType={'submit'}
                    btnInnerText={searchIcon}
                    handleClick={props.showSearchModal} 
                    btnStyle={'mr-2 py-[.1rem] px-1 rounded-md cursor-pointer hover:bg-gray-600 text-[1.5rem] font-extrabold'}
                    />
                    <Button 
                    btnInnerText={barsIcon}
                    btnStyle={'py-[.1rem] px-1 rounded-md cursor-pointer hover:bg-gray-600 text-2xl'}
                    handleClick={props.showSlideMenu}
                    />
                </div>
            </div>
        </div>
    )

}

export default Navbar