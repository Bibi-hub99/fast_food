import {useSearchParams} from "react-router-dom"
import {findByCategory} from "../http"
import {useState,useEffect} from "react"
import {useMyContext} from "../context"
import ProductCard from "../components/productCard"

function Category(){

    const {foodCategories} = useMyContext()

    const [searcher,setSearcher] = useSearchParams()
    const [meals,setMeals] = useState([])
    const query = searcher.get("query")
    const limit = searcher.get("limit")

    console.log(meals)

    useEffect(()=>{
        const fetchByCategory = async({query,limit})=>{
            let response;
            try{

                if(query === 'fast-food'){
                    response = await findByCategory({query:"fast food",limit:limit})
                }else{

                    const findMatch = foodCategories.find((each)=>{
                        return each.url_query.toLowerCase() === query.toLowerCase()
                    })
                
                    if(!findMatch){
                        throw "invalid url"
                    }else{
                        response = await findByCategory({query:findMatch.title.toLowerCase(),limit:limit})
                    }

                }
                setMeals(response)

            }catch(err){
                console.log(err)
            }
        }
        
        fetchByCategory({query,limit})

    },[searcher])

    return (
        <div>
            <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"}>
                {
                    meals.length > 0 ? meals.map((each)=>{
                        return (
                            <ProductCard
                            key={`categories${each._id}`}
                            cardStyle={"border-2 rounded-md border-white text-white hover:text-orange-500 hover:border-orange-500"}
                            mealID={`category/${each._id}?query=${query}`}
                            imageURL={each.imageURL}
                            mealName={each.name}
                            mealPrice={each.price}
                            />
                        )
                    }):(<div>
                            {<p className={"text-red-700 mt-20 text-center text-[2rem]"}>No Meals Available for this category</p>}
                        </div>)
                }
            </div>
        </div>
    )


}

export default Category