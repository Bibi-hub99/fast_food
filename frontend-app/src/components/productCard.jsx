import ImageDisplayer from "./image"
import {Link} from "react-router-dom"
import {useMyContext} from "../context"
import ParamButton from "./param-button"

function ProductCard(props){

    const {heartIcon,cartIcon} = useMyContext()

    return (
        <div className={`${props.cardStyle} relative bg-transparent`}>
            <div className={'h-[200px]'}>
                <Link to={props.mealID} relative={props.isRelative ? "path":"route"}>
                    <ImageDisplayer imageURL={props.imageURL} imageStyle={'w-full h-full object-cover rounded-md'}/>
                </Link>
            </div>
            <div className={'text-2xl px-1 box-border'}>
                <h2>{props.mealName}</h2>
                <p className={'mt-2'}>R{props.mealPrice}</p>
            </div>
            <div className={'absolute top-0 right-2 text-[1.7rem] text-black'}>
                <ParamButton
                btnType={"button"}
                btnInnerText={heartIcon}
                btnStyle={'mr-[.8rem] cursor-pointer'}
                meal_id={props.byPass ? props.meal_id : props.mealID}
                handleClick={props.addToFavs}
                />
                <ParamButton
                btnType={"button"}
                btnInnerText={cartIcon}
                btnStyle={"cursor-pointer"}
                meal_id={props.byPass ? props.meal_id : props.mealID}
                handleClick={props.addToCart}
                />
            </div>
        </div>
    )

}

export default ProductCard