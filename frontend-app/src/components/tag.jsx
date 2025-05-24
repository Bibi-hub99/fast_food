import {useMyContext} from "../context"
import ParamButton from "./param-button"

function Tag(props){

    const {clearIcon} = useMyContext()

    return (
        <div className={'bg-gray-300 py-2 rounded-md text-center relative'}>
            <p>{props.title}</p>
            <ParamButton
            btnType={"button"}
            btnInnerText={clearIcon}
            btnStyle={"text-black absolute top-0 right-1 cursor-pointer"}
            meal_id={props.title}
            handleClick={props.handleTags}
            />
        </div>
    )

}

export default Tag