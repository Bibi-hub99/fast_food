import {useOutletContext} from "react-router-dom"

function AboutProduct(){

    const [productData,setProductData,singleMeal,similarMeals] = useOutletContext()
    
    return (
        <div className={'text-orange-500'}>
            <h2 className={'text-3xl'}>{singleMeal.name}</h2><br></br>
            <h2 className={'text-2xl'}>R{singleMeal.price}</h2><br></br>
            <h2 className={'text-2xl'}>{singleMeal.description}</h2><br></br>
            <div>
                <p className={'underline text-[1.5rem]'}>Locations</p>
                <ul className={'text-[1.2rem]'}>
                    {
                        singleMeal.locations ? singleMeal.locations.map((each,index)=>{
                            return (
                                <li className={''} key={`locations${index}`}>{each.town}</li>
                            )
                        }):[]
                    }
                </ul>
            </div>
        </div>
    )

}

export default AboutProduct