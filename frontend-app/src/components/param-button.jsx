function ParamButton(props){

    return (
        <button onClick={()=>props.handleClick(props.meal_id)} type={props.btnType} className={props.btnStyle}>{props.btnInnerText}</button>
    )

}

export default ParamButton