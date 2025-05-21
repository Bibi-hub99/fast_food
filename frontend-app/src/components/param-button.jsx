function ParamButton(props){

    return (
        <button onClick={()=>props.handleClick(props.meal_id)} className={props.btnStyle}>{props.btnInnerText}</button>
    )

}

export default ParamButton