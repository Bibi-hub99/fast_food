import ImageDisplayer from "./image"
import {useMyContext} from "../context"
import ParamButton from "./param-button"
import Input from "./input"


function CartCard(props){

    const {binIcon,plusIcon,minusIcon} = useMyContext()

    return (
        <div className={'border-2 flex mb-2 rounded-md text-white'}>
            <div className={'w-[40%] h-[150px] py-1 px-1 md:w-[30%]'}>
                <ImageDisplayer imageURL={props.imageURL} imageStyle={'h-full w-full object-cover rounded-md'}/>
            </div>
            <div className={'text-[1.2rem] md:text-[1.5rem] w-[60%] md:w-[70%]'}>
                <h2>{props.name}</h2>
                <h2 className={"mt-2"}>R{props.price}</h2>
                <div className={'flex items-center'}>
                    <div className={'w-[50%] relative md:w-[35%]'}>
                        <Input 
                        inputType={'text'}
                        inputName={''}
                        inputValue={props.quantity}
                        inputStyle={'border-1 w-full rounded-md mt-1 outline-none px-1 box-border text-center'}/>
                        <ParamButton
                        btnInnerText={minusIcon}
                        btnStyle={'absolute left-2 top-[.1rem] cursor-pointer'}
                        handleClick={props.decrement}
                        meal_id={props.meal_id}/>
                        <ParamButton
                        btnInnerText={plusIcon}
                        btnStyle={'absolute right-2 top-[.1rem] cursor-pointer'}
                        handleClick={props.increment}
                        meal_id={props.meal_id}/>

                    </div>
                    <div className={'w-[50%]'}>
                        <ParamButton
                        btnInnerText={binIcon}
                        btnStyle={'bg-red-500 ml-2 px-5 rounded-md mt-[.2rem] cursor-pointer'}
                        handleClick={props.removeItem}
                        meal_id={props.meal_id}/>
                    </div>
                </div>
                <p>Remaining : {props.available}</p>

            </div>            
        </div>
    )

}

export default CartCard