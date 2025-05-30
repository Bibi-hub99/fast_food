import {useNavigate} from"react-router-dom"
import {useState,useEffect} from "react"
import PayResponse from "../components/paymentbanner"
import BankingCard from "../components/banking-card"
import ReceiverInfo from "../components/receiver-info"
import {makePurchase} from "../http"

function Checkout(){

    const [myCart,setMyCart] = useState(JSON.parse(localStorage.getItem("my-cart-food")) || [])
    const [accountInfo,setAccountInfo] = useState(JSON.parse(sessionStorage.getItem("account-info")) || {
        buyerName:"",
        buyerTelephone:"",
        deliveryAddress:"",
        accountHolder:"",
        accountNumber:""
    })
    const [redirect,setRedirect] = useState(false)
    const [processPay,setProcessPay] = useState(false)
    const [responseAwait,setResponseAwait] = useState(false)
    const [message,setMessage] = useState({
        responseMsg:"",
        isSuccess:false,
    })

    const [multiStep,setMultiStep] = useState({
        step1:true,
        step2:false
    })


    const handleChange = (evt)=>{
        const {name,value} = evt.target
        setAccountInfo((oldValue)=>{
            return {
                ...oldValue,
                [name]:value
            }
        })
    }

    const handleStepFormNext = ()=>{

        const {buyerName,buyerTelephone,deliveryAddress} = accountInfo
        try{
            if(buyerName && !buyerName.match(/[0-9]/g)){
                if(buyerTelephone.length === 10 && !(buyerTelephone.match(/[A-Z]/g) || buyerTelephone.match(/[a-z]/g))){
                    if(deliveryAddress){
                        setMultiStep({
                        step1:false,
                        step2:true
                        })
                    }else{
                        throw 'fill delivery address'
                    }
                }else{
                    throw 'fill corrent telephone number'
                }

            }else{
                throw "fill buyer name"
            }

        }catch(err){
            console.log(err)
        }

    }

    const handleStepFormBack = ()=>{
        setMultiStep({
            step2:false,
            step1:true
        })
    }

    const navigate = useNavigate()

    const handleNavRedirect = ()=>{
        navigate("..",{relative:"path"})
    }

    const purchaseValid = ()=>{

        const {accountHolder,accountNumber} = accountInfo

        const Valid = ()=>{


            try{
                if(accountHolder && !accountHolder.match(/[0-9]/g)){
                    if(accountNumber.length >= 10 && !(accountNumber.match(/[A-Z]/g) || accountNumber.match(/[a-z]/g))){
                    
                        if(myCart.length > 0){
                            const validity = myCart.every((each)=>{
                                return each.quantity <= each.available
                            })
                            if(validity){
                                return validity
                            }else{
                                throw "cannot add more than available"
                            }
                        }else{
                            throw "fill the cart"
                        }

                    }else{
                        throw "account number must have 10 or more digits and not include letters"
                    }
                }else{
                    throw "account holder must be filled and not include numbers"
                }
            }catch(err){
                console.log(err)
            }
        }

        return Valid()

    }

    const handlePurchase = async()=>{
        if(purchaseValid()){

            const {buyerName,buyerTelephone,deliveryAddress} = accountInfo

            setProcessPay(true)
            setResponseAwait(true)
            const response = makePurchase({
                buyerName:buyerName,
                buyerTelephone,
                deliveryAddress:deliveryAddress,
                items:[...myCart]

            }).then(({data})=>{
                setResponseAwait(false)
                setMessage({responseMsg:"Your order was successful",isSuccess:true})
                setTimeout(()=>{
                setProcessPay(false)
                handleNavRedirect()
                },3000)
                setMyCart((oldValue)=>{
                    return oldValue.map((each)=>{
                        const findMatch = data.response.find((single)=>single._id === each._id)
                        return {
                            ...each,
                            ["available"]:findMatch.available
                        }
                    })
                })
                    
            }).catch((err)=>{

                setMessage({
                    responseMsg:"Your order was unsuccessful",
                    isSuccess:false
                })
                setResponseAwait(false)
                setTimeout(()=>{
                    setProcessPay(false)
                    handleNavRedirect()
                },3000)

            })
            
        }
    }

    useEffect(()=>{
        sessionStorage.setItem("account-info",JSON.stringify(accountInfo))
    },[accountInfo])

    useEffect(()=>{
        localStorage.setItem("my-cart-food",JSON.stringify(myCart))
    },[myCart])

    return (
        <div className={""}>

            {<div className={"h-[80vh] flex flex-col justify-center items-center"}>
                <h2 className={"text-white"}>Do not enter your real credentials this is for demo purposes!!!</h2>
                
                {multiStep.step1 && <ReceiverInfo
                buyerName={accountInfo.buyerName}
                buyerTelephone={accountInfo.buyerTelephone}
                deliveryAddress={accountInfo.deliveryAddress}
                handleChange={handleChange}
                handleStepForm={handleStepFormNext}
                />}
                {multiStep.step2 && <BankingCard 
                accountHolder={accountInfo.accountHolder} 
                accountNumber={accountInfo.accountNumber}
                handleChange={handleChange}
                handleStepForm={handleStepFormBack}
                handlePurchase={handlePurchase}
                />}

            </div>}

            <PayResponse 
            responseMsg={message.responseMsg}
            isSuccess={message.isSuccess}
            redirectMsg={`You will now be redirected to cart`}
            responseAwait={responseAwait}
            processPay={processPay}/>
        </div>
    )
    
}

export default Checkout