function ImageDisplayer(props){

    return (
        <img src={props.imageURL} className={props.imageStyle}></img>
    )

}

export default ImageDisplayer