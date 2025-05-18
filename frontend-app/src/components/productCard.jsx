import ImageDisplayer from "./image"
import {Link} from "react-router-dom"

function ProductCard(props){

    return (
        <div className={props.cardStyle}>
            <div className={'h-[200px]'}>
                <Link to={props.mealID}>
                    <ImageDisplayer imageURL={props.imageURL} imageStyle={'w-full h-full object-cover rounded-md'}/>
                </Link>
            </div>
            <div className={'text-2xl px-1 box-border'}>
                <h2>{props.mealName}</h2>
                <p className={'mt-2'}>R{props.mealPrice}</p>
            </div>
        </div>
    )

}

export default ProductCard