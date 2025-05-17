import ReactDOM from "react-dom"
import Input from "./input"
import Button from "./button"
import {useMyContext} from "../context"


function Modal(props){

    const {clearIcon,searchIcon} = useMyContext()

    const style = {
        backgroundColor:'rgba(0,0,0,0.8)',
        width:'100%',
        position:'fixed',
        inset:'0'
    }

    return (
        ReactDOM.createPortal(
        <>
            {props.modalOpen && <div className={props.modalStyle} style={style}>
                
                <div className={'bg-white relative top-[10%] w-[95%] m-auto rounded-md py-1'}>
                    <Button
                    btnType={'button'}
                    btnInnerText={clearIcon}
                    handleClick={props.hideSearchModal}
                    btnStyle={'py-1 px-2 ml-[.5%] rounded-md mb-1 hover:bg-gray-400 cursor-pointer'}/>
                    <Input
                    inputValue={props.inputValue}
                    inputChange={props.inputChange}
                    inputType={'text'}
                    inputStyle={"border-2 w-[99%] ml-[.5%] py-3 rounded-md pl-2 box-border"}/>
                    <Button
                    btnType={'submit'}
                    handleClick={props.handleSearch}
                    btnInnerText={searchIcon}
                    btnStyle={'absolute right-2 top-[48%] py-2 bg-orange-500 px-5 rounded-md text-white'}/>
                </div>

            </div>}
        </>,
    document.getElementById("modal"))
        )

}

export default Modal