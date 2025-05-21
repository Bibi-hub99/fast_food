import {NavLink,useLocation,useSearchParams} from "react-router-dom"
import {useMyContext} from "../context"

function Categories(){

    const {foodCategories} = useMyContext()

    const normalLink = 'py-2 px-2 rounded-md block text-center duration-100'
    const activeLink = 'bg-orange-500 '+normalLink
    const inActiveLink = 'border-1 border-solid border-white hover:bg-orange-500 hover:border-orange-500 '+normalLink

    const [searcher,setSearcher] = useSearchParams()
    const openCategory = 'bg-orange-500 '+normalLink
    const closedCategory = 'border-1 border-solid border-white hover:bg-orange-500 hover:border-orange-500 '+normalLink

    const fastFood = 'fast-food'

    return (
        <div className={'text-white mb-5 grid grid-cols-4 gap-2 md:grid-cols-6 lg:grid-cols-7'}>
            <NavLink to={'.'} className={({isActive}) => isActive ? activeLink:inActiveLink} end>All</NavLink>
            <NavLink to={`categories?query=${fastFood}`} className={fastFood === searcher.get("query") ? openCategory:closedCategory}>Fast Food</NavLink>
            {foodCategories.map((each)=>{
                return (
                    <NavLink to={`categories?query=${each.url_query}`} key={`categories${each.id}`} className={each.url_query === searcher.get("query") ? openCategory:closedCategory}>
                        {each.title}
                    </NavLink>
                )
            })}
        </div>
    )

}

export default Categories