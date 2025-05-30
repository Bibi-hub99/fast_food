import Input from "./input"
import {useMyContext} from "../context"
import Button from "./button"

function ReceiverInfo(props){

    const commonStyle = 'border-1 w-full box-border py-2 rounded-md outline-none px-1'


    return (
        <div className={"bg-white rounded-lg w-[100%] max-w-[500px]"}>
            <div className={'text-center'}>
                <p>Fill the details:</p>
            </div>
            <div className={'py-10 px-2 box-border'}>
                <Input
                inputType={'text'}
                inputName={'buyerName'}
                inputID={'buyerName'}
                inputStyle={`${commonStyle}`}
                inputValue={props.buyerName}
                inputHolder={"Account Buyer"}
                inputChange={props.handleChange}
                />
                <Input
                inputType={'tel'}
                inputName={'buyerTelephone'}
                inputID={'buyerTel'}
                inputStyle={`${commonStyle} mt-7`}
                inputValue={props.buyerTelephone}
                inputHolder={'Account Telephone'}
                inputChange={props.handleChange}/>
                <div className={''}>

                    <Input
                    inputType={'text'}
                    inputName={'deliveryAddress'}
                    inputID={'address'}
                    inputStyle={`${commonStyle} mt-7`}
                    inputValue={props.deliveryAddress}
                    inputHolder={'Address'}
                    inputChange={props.handleChange}/>

                </div>
                <br></br>
                <div className={'text-end'}>
                    <Button
                    btnInnerText={'Next'}
                    btnStyle={'bg-red-600 text-white py-2 px-4 box-border rounded-md'}
                    handleClick={props.handleStepForm}/>
                </div>
            </div>
        </div>
    )

}

export default ReceiverInfo