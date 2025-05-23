import {useLoaderData,Await} from "react-router-dom"
import {Suspense,useState,useEffect} from "react"
import Spinner from "../components/suspense-fallback"
import ProductCard from "../components/productCard"

function AllMenuProducts(){

    const {response} = useLoaderData()
    const [menuItems,setMenuItems] = useState([])

    return (
        <Suspense fallback={<Spinner/>}>
            <Await resolve={response}>
                {
                    ({data})=>(
            
                        <div>
                            {
                                useEffect(()=>{
                                    setMenuItems(data.meals)
                                },[])
                            }
                            <div>
                                <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'}>
                                    {
                                        menuItems.map((each)=>{
                                            return (
                                                <ProductCard
                                                key={`menuItems${each._id}`} 
                                                cardStyle={'border-2 rounded-md border-white text-white transition duration-100 hover:text-orange-500 hover:border-orange-500 '}
                                                mealID={each._id}
                                                imageURL={each.imageURL}
                                                mealName={each.name}
                                                mealPrice={each.price}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            
                        </div>
                        
                    )
                }
            </Await>
        </Suspense>
    )

}

export default AllMenuProducts