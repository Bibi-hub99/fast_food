import {useMyContext} from "../context"
import Input from "./input"
import Button from "./button"

function BankingCard(props){

    const {masterCard} = useMyContext()

    const commonStyle = 'border-1 w-full box-border py-2 rounded-md outline-none px-1'

    return (
        <div className={"bg-white rounded-lg w-[100%] max-w-[500px]"}>
            <div className={""}>
                <p className={"rounded-lg text-end px-2 box-border"}>{masterCard}</p>
            </div>
            <div className={"py-10 px-2 box-border"}>
                <Input
                inputType={'text'}
                inputName={'accountHolder'}
                inputID={'accountHolder'}
                inputStyle={`${commonStyle} `}
                inputValue={props.accountHolder}
                inputHolder={"Account Holder"}
                inputChange={props.handleChange}
                />
                <Input
                inputType={'text'}
                inputName={'accountNumber'}
                inputID={"accountNumber"}
                inputStyle={`${commonStyle} mt-7`}
                inputValue={props.accountNumber}
                inputHolder={'Account Number'}
                inputChange={props.handleChange}
                />
                <br></br>
                <br></br>
                <Button
                btnInnerText={'Back'}
                btnType={'button'}
                btnStyle={'text-white bg-red-600 px-4 py-2 rounded-md cursor-pointer'}
                handleClick={props.handleStepForm}/>
                <Button
                btnInnerText={'Pay Now'}
                btnType={"submit"}
                btnStyle={'text-white bg-green-600 px-2 py-2 rounded-md cursor-pointer ml-5'}
                handleClick={props.handlePurchase}/>
            </div>
        </div>
    )

}

export default BankingCard