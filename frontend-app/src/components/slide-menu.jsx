import {useMyContext} from "../context"
import Button from "./button"
import {NavLink} from "react-router-dom"

function SlideMenu(props){

    const {clearIcon,navbarLinks} = useMyContext()

    const linkStyle = 'block py-2  w-[95%] m-auto rounded-md px-1 box-border hover:bg-gray-500'
    const activeLink = linkStyle + ' bg-orange-500'
    const mobileLink = linkStyle + ' mt-2'

    const parentStyle = {
        backgroundColor:"rgba(0,0,0,0.8)",
        height:'100vh',
        width:props.width,
        top:'0',
        zIndex:'30'
    }

    const navbarLinkMap = navbarLinks.map((each)=>{
        return <NavLink 
        to={each.url} 
        key={`slideLinks${each.id}`} 
        className={({isActive}) => isActive ? activeLink:mobileLink}
        onClick={props.hideSlideMenu}>{each.title}</NavLink>
    })

    return (
        <div className={'fixed md:hidden duration-100'} style={parentStyle}>
            <div className={'w-[50%] h-full bg-black shadow-gray-400 shadow-md text-white overflow-x-hidden relative pt-14 box-border'}>
                <Button
                btnInnerText={clearIcon}
                btnStyle={'absolute right-1 hover:bg-gray-400 rounded-md top-1 py-2 px-2 cursor-pointer'}
                handleClick={props.hideSlideMenu}/>
                
                <div>
                    <NavLink to={'.'} 
                    className={({isActive}) => isActive ? activeLink:linkStyle}
                    onClick={props.hideSlideMenu}>Home</NavLink>
                    {navbarLinkMap}
                </div>
            </div>
        </div>
    )

}

export default SlideMenu