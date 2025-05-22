import {useMyContext} from "../context"
import Button from "./button"
import Input from "./input"

function SearchNav(props){

    const {barsIcon,searchIcon,sortIcon} = useMyContext()

    return (
        <div className={"bg-black text-white py-3"}>
            <div className={'flex items-center w-[97%] m-auto justify-between md:justify-start'}>
                <div className={'w-[20%] md:w-[10%]'}>
                    <Button
                    btnType={"button"}
                    btnStyle={"bg-orange-500 py-1 px-3 rounded-md cursor-pointer"}
                    btnInnerText={"Back"}
                    handleClick={()=>props.goBack(props.num)}/>
                </div>
                <div className={'w-[68%] relative md:w-[50%] lg:w-[40%] md:ml-[1rem]'}>
                    <Input
                    inputType={"text"}
                    id={"search-input"}
                    inputValue={props.searchInput}
                    inputChange={props.handleChange}
                    inputStyle={"w-[100%] py-2 box-border pl-2 pr-[3rem] rounded-md border-2 outline-none"}
                    inputHolder={"Search..."}
                    />
                    <Button
                    btnType={"submit"}
                    btnInnerText={searchIcon}
                    btnStyle={"bg-orange-500 rounded-md px-3 absolute right-1 h-[80%] top-[10%] md:px-5 cursor-pointer"}
                    handleClick={props.handleSearch}
                    />
                </div>
                <div className={"w-[10%] px-2 rounded-md md:ml-[1rem]"}>
                    <Button
                    btnInnerText={sortIcon}
                    btnType={"button"}
                    btnStyle={"md:text-[1.9rem] cursor-pointer"}
                    />
                </div>
            </div>
        </div>
    )

}

export default SearchNav