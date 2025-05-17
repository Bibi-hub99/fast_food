function Button(props){
    return (
        <button type={props.btnType} className={props.btnStyle} onClick={props.handleClick}>{props.btnInnerText}</button>
    )
}

export default Button