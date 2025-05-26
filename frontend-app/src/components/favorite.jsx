import ImageDisplayer from "./image"
import {useMyContext} from "../context"
import ParamButton from "./param-button"

function Favorite(props){

    const {cartIcon,binIcon} = useMyContext()

    return (
        <div className={'border-2 flex mt-2 rounded-md text-white md:w-[80%] lg:w-[50%]'}>
            <div className={'w-[40%] h-[150px] py-1 px-1 md:w-[30%]'}>
                <ImageDisplayer imageURL={props.imageURL} imageStyle={'h-full w-full object-cover rounded-md'}/>
            </div>
            <div className={'text-[1.2rem] md:text-[1.5rem]'}>
                <h2>{props.name}</h2>
                <h2 className={'mt-2'}>R{props.price}</h2>

                <ParamButton
                 btnInnerText={cartIcon} 
                 btnStyle={'bg-green-500 px-5 rounded-md mt-5 cursor-pointer'}
                 meal_id={props.meal_id}
                 handleClick={props.addToCart}/>

                <ParamButton 
                btnInnerText={binIcon} 
                btnStyle={'bg-red-500 px-5 rounded-md ml-2 cursor-pointer'}
                meal_id={props.meal_id}
                handleClick={props.removeItem}/>
            </div>
        </div>
    )

}

export default Favorite