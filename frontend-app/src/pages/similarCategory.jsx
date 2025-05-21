import {useOutletContext,useSearchParams} from "react-router-dom"
import {useState,useEffect} from "react"
import ProductCard from "../components/productCard"


function SimilarCategory(props){

    const [productData,setProductData,singleMeal,similarMeals] = useOutletContext()
    const [searcher,setSearcher] = useSearchParams()

    const query = searcher.get("query")

    return (
        <div className={"text-white"}>
            {
                typeof(similarMeals) == "object" ? similarMeals.length > 0 ?
                <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"}>
                    {
                        similarMeals.map((each)=>{
        
                            return (
                                <ProductCard
                                key={`similarMeals${each._id}`}
                                cardStyle={"border-2 rounded-md border-white text-white transition duration-100 hover:text-orange-500 hover:border-orange-500"}
                                mealID={`../../${each._id}?query=${query}`}
                                isRelative={true}
                                imageURL={each.imageURL}
                                mealName={each.name}
                                mealPrice={each.price}/>
                            )
                        })
                    }
                </div>
                :<p>No Similar Meals</p>:<p>No Similar Meals</p>
            }        
        </div>
    )

}

export default SimilarCategory