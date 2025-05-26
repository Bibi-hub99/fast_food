import {createPortal} from "react-dom"

function Banner(props){

    const bannerStyle = {
        zIndex:"25",
        boxSizing:"border-box",
        backgroundColor:props.bannerBgColor,
        borderRadius:".5rem",
        color:'white',   
    }

    return (
        createPortal(
        <>
            {props.bannerState && <div 
            className={`fixed ${props.bannerStyle} w-[98%] top-[.5rem] left-[1%] md:w-auto md:left-auto py-4  md:px-[5rem] right-1`}
            style={bannerStyle}>
                <h2>
                    {props.bannerMessage}
                </h2>
            </div>}
        </>,document.getElementById("banner-modal"))
    )

}

export default Banner