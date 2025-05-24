import ImageDisplayer from "./image"
import {useMyContext} from "../context"
import ParamButton from "./param-button"


function AdminCard(props){

    const {penIcon} = useMyContext()

    return (
        <div className={'border-2 rounded-md'}>
            <div className={'h-[10rem]'}>
                <ImageDisplayer imageURL={props.imageURL} imageStyle={props.imageStyle}/>
            </div>
            <div className={"py-2 px-1 box-border"}>
                <div className={'flex items-start'}>
                    <div className={'w-[60%]'}>
                        <p className={''}>{props.name}</p>
                    </div>
                    <div className={'w-[40%] text-end'}>
                        <ParamButton
                        btnInnerText={penIcon}
                        btnStyle={'bg-orange-500 px-5 py-1 rounded-md cursor-pointer text-end'}
                        meal_id={props.meal_id}
                        handleClick={props.viewProduct}/>
                    </div>
                </div>
                <p className={'mt-2'}>{props.price}</p>

            </div>
        </div>
    )

}

export default AdminCard