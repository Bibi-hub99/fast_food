function Input(props){

    const stopSubmit = (evt)=>{
        if(evt.key === "Enter"){
            evt.preventDefault()
        }
    }

    return (
        <input type={props.inputType}
         onKeyDown={stopSubmit} 
         id={props.inputID} 
         className={props.inputStyle} 
         onChange={props.inputChange} 
         value={props.inputValue}
         name={props.inputName} 
         placeholder={props.inputHolder}></input>
    )

}

export default Input