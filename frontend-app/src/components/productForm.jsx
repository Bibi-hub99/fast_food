import Button from "./button"
import Input from "./input"
import TextArea from "./textarea"
import {useMyContext} from "../context"

function ProductForm(props){

    const {clearIcon} = useMyContext()

    const commonStyle = 'border-2 mt-2 w-full rounded-md py-2 outline-none px-1 box-border'

    return (

        <div className={`bg-white h-[90%] rounded-t-md py-2 px-2 box-border md:rounded-b-md ${props.formStyle} overflow-auto`}>
            <p>{props.formTitle}</p>
            <hr className={"h-[.1rem] border-none bg-gray-400 mt-[.5rem] "}></hr>
            {props.isUpdateForm && <Button
            btnInnerText={clearIcon}
            btnStyle={'absolute right-2 top-1 text-[1.5rem] hover:bg-gray-300 py-1 px-2 rounded-md cursor-pointer'}
            handleClick={props.closeModifyModal}/>}
            <form name={props.formName} autoComplete={'off'}>

                <Input
                inputType={"text"}
                inputStyle={`${commonStyle}`}
                inputValue={props.name}
                inputName={'name'}
                inputHolder={'Name'}
                inputChange={props.handleChange}
                />

                <Input
                inputType={"text"}
                inputStyle={`${commonStyle}`}
                inputValue={props.imageURL}
                inputName={"imageURL"}
                inputHolder={"image url"}
                inputChange={props.handleChange}
                />

                <Input
                inputType={'text'}
                inputStyle={`${commonStyle}`}
                inputValue={props.price}
                inputName={'price'}
                inputHolder={'Price'}
                inputChange={props.handleChange}
                />

                <TextArea
                textStyle={`${commonStyle} resize-none`}
                textHolder={'Description'}
                textName={'description'}
                textValue={props.description}
                textChange={props.handleChange}
                />

                <Input
                inputType={'text'}
                inputStyle={`${commonStyle}`}
                inputValue={props.category}
                inputName={'category'}
                inputHolder={'category'}
                inputChange={props.handleChange}/>

                <div className={'flex mt-2 justify-between'}>
                    <Input
                    inputType={'text'}
                    inputStyle={`w-[80%] border-2 outline-none rounded-md py-2 px-1 box-border`}
                    inputValue={props.tagText}
                    inputName={'tag'}
                    inputHolder={'Add tag'}
                    inputChange={props.handleTagText}/>

                    <Button
                    btnInnerText={'Add'}
                    btnType={'button'}
                    btnStyle={'w-[19%] bg-black text-white rounded-md cursor-pointer'}
                    handleClick={()=>props.addTag(props.tagText)}/>

                </div>
                <div className={'grid grid-cols-5 gap-2 mt-2'}>
                    {props.typeTags}
                </div>

                <div className={'flex mt-2 justify-between'}>

                    <Input
                    inputType={'text'}
                    inputStyle={`w-[80%] border-2 outline-none rounded-md py-2 px-1 box-border`}
                    inputValue={props.locationText}
                    inputName={"location"}
                    inputHolder={'Add town location'}
                    inputChange={props.handleLocationText}
                    />

                    <Button
                    btnInnerText={'Add'}
                    btnType={'button'}
                    btnStyle={'w-[19%] bg-black text-white rounded-md cursor-pointer'}
                    handleClick={()=>props.addLocation(props.locationText)}
                    />

                </div>
                <div className={'grid grid-cols-5 gap-2 mt-2'}>{props.locationTags}</div>
                <div className={"mt-5"}>
                    <Button
                    btnType={"submit"}
                    btnInnerText={props.btnInnerText}
                    btnStyle={`bg-orange-500 px-4 py-2 rounded-md text-white cursor-pointer`}
                    handleClick={props.productUpdate}/>
                </div>
            </form>
        </div>

    )

}

export default ProductForm