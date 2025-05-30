import {createPortal} from "react-dom"
import Spinner from "./suspense-fallback"
import {useMyContext} from "../context"

function PayResponse(props){

    const {tickIcon,errorIcon} = useMyContext()

    return (
        createPortal(
        <>
            {props.processPay && <div className={'payment-container'}>
                {props.responseAwait && <div className={"payment-content"}>
                    <h1>Processing your payment...</h1>
                    <br></br>
                    <Spinner/>
                </div>}
                {!props.responseAwait && <div>
                    <div className={'text-center'}>
                        <h1 className={'text-2xl'}>{props.responseMsg}</h1>
                        <br></br>
                        <div className={"text-6xl"}>{props.isSuccess ? tickIcon:errorIcon}</div>
                        <br></br>
                        <h2>{props.redirectMsg}</h2>
                    </div>
                </div>}

            </div>}
        </>,document.getElementById("payment-response"))
    )

}

export default PayResponse