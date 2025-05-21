function Comment(props){

    return (
        <div className={props.commentStyle}>
            <p>{props.commentDate}</p>
            <br></br>
            <p>{props.commentText}</p>
        </div>
    )

}

export default Comment