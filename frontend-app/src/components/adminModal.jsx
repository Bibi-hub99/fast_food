import ReactDOM from "react-dom"
import ProductForm from "./productForm"

function AdminModal(props){
    
    return (
        ReactDOM.createPortal(
            <>
                {props.openModify && <div className={"fixed top-0 w-full h-[100vh]"} style={{backgroundColor:"rgba(0,0,0,0.8)",zIndex:'30'}}>
                    <ProductForm
                    formStyle={'relative top-[10%] w-[99%] left-[.5%] md:w-[80%] md:left-[10%] md:top-[5%] lg:w-[60%] lg:left-[20%] xl:w-[50%] xl:left-[25%]'}
                    btnInnerText={'Update'}
                    formTitle={'Update Information'}
                    isUpdateForm={true}
                    closeModifyModal={props.closeModifyModal}
                    updateProduct={props.updateProduct}
                    name={props.name}
                    imageURL={props.imageURL}
                    price={props.price}
                    description={props.description}
                    category={props.category}
                    typeTags={props.typeTags}
                    locationTags={props.locationTags}
                    handleChange={props.handleChange}
                    tagText={props.tagText}
                    locationText={props.locationText}
                    handleTagText={props.handleTagText}
                    handleLocationText={props.handleLocationText}
                    addTag={props.addTag}
                    addLocation={props.addLocation}
                    productUpdate={props.productUpdate}
                    />
                </div>}
            </>,
        document.getElementById("admin-modal"))

    )

}

export default AdminModal