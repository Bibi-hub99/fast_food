function TextArea(props){

    return (
        <textarea 
        className={props.textStyle}
        name={props.textName} 
        value={props.textValue} 
        cols={props.cols} 
        rows={props.rows} 
        onChange={props.textChange} 
        placeholder={props.textHolder}></textarea>
    )

}

export default TextArea