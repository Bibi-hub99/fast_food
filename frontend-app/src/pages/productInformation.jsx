import {useOutletContext} from "react-router-dom"
import {useState} from "react"
import {useMyContext} from "../context"
import ParamButton from "../components/param-button"
import Button from "../components/button"
import TextArea from "../components/textarea"
import Comment from "../components/comment"
import {likeProduct,dislikeProduct,addComment} from "../http"

function ProductInfo(props){

    const {likeIcon,dislikeIcon} = useMyContext()

    const [productData,setProductData,singleMeal] = useOutletContext()
    const [commentText,setCommentText] = useState("")

    console.log(productData.comments)


    let likes = productData !== null ? productData.likes:0
    let dislikes = productData !== null ? productData.dislikes:0
    let comments = productData !== null ? productData.comments:[]

    const likeMeal = async(productDataID)=>{
        try{

            const response = await likeProduct(productDataID)

            setProductData((oldValue)=>{
                return {
                ...oldValue,
                likes:response.likes
            }

        })
        
        }catch(err){
            console.log(err)
        }
    }

    const dislikeMeal = async (productDataID)=>{
        try{
            const response = await dislikeProduct(productDataID)
            setProductData((oldValue)=>{
                return {
                    ...oldValue,
                    dislikes:response.dislikes
                }
            })
        }catch(err){
            console.log(err)
        }
    }

    const addMealComment = async({id,comment})=>{

        const productDataID = id
        const productComment = comment

        try{

            const response = await addComment({productDataID,productComment})
            setProductData((oldValue)=>{
                return {
                    ...oldValue,
                    comments:response.comments
                }
            })
            setCommentText("")
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className={'text-white'}>
            <div>
                <div className={'inline-block'}>
                    <Button
                    btnInnerText={`Like ${likes}`}
                    btnStyle={"py-2 px-6 bg-orange-500 rounded-md cursor-pointer"}
                    handleClick={()=>likeMeal(productData._id)}/>
                </div>
                <div className={'inline-block ml-2'}>
                    
                    <Button
                    btnInnerText={`Dislike ${dislikes}`}
                    btnStyle={"border-2 py-2 px-6 rounded-md cursor-pointer"}
                    handleClick={()=>dislikeMeal(productData._id)}/>
                </div>
                <div>
                    <h3 className={'underline mt-3'}>Comments</h3>

                    <TextArea
                    textStyle={"border-b-2 resize-none outline-none w-full pt-5 mt-2"}
                    textHolder={"Add Comment..."}
                    textValue={commentText}
                    textChange={(evt)=>setCommentText(evt.target.value)} 
                    rows={'1'}/>

                    <div className={'flex'}>
                        <Button
                        btnInnerText={"submit"}
                        handleClick={()=>addMealComment({id:productData._id,comment:commentText})}
                        btnStyle={"ml-auto bg-orange-500 text-black hover:text-white px-2 py-1 rounded-md cursor-pointer"}/>
                    </div>
                    <div className={"mt-5 mb-5"}>
                    {
                        typeof(comments) === "object" ? comments.length > 0 ?
                        comments.map((each,index)=>{
                            return (
                                <Comment key={`comments${index}`}
                                commentStyle={'border-1 mt-3 rounded-lg px-1 box-border'}
                                commentDate={each.commentDate}
                                commentText={each.commentText}
                                />
                            )
                        }):<p>No Comments</p>:<p>No Comments</p>

                    }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ProductInfo