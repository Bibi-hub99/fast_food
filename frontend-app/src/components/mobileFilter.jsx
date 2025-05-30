import Button from "./button"
import {useMyContext} from "../context"

function MobileFilter(props){

    const {filters,clearIcon} = useMyContext()

    return (
        <div className={"bg-white fixed top-[4rem] right-2 w-[50%] px-2 box-border rounded-md"}>
            <Button 
            btnStyle={"absolute right-1 top-2 text-[1.2rem] cursor-pointer"}
            btnInnerText={clearIcon}
            handleClick={()=>props.toggleOpenFilter(props.state)}/>


            <p className={'mt-2'}>Filter</p>
            <hr className={'h-[.1rem] border-none bg-gray-300'}></hr>
            <Button
            btnInnerText={'Apply'}
            btnStyle={"my-2 bg-black text-white px-1 py-1 rounded-md"}
            handleClick={props.applyFilters}/>            
            <div>
                <ul>
                    {
                        props.filterMaps
                    }
                </ul>
                <ul className={'mt-5'}>
                    {props.sorterMaps}
                </ul>
            </div>
        </div>
    )

}

export default MobileFilter