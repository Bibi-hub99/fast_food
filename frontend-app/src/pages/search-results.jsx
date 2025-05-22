import {useSearchParams,useNavigate} from "react-router-dom"
import SearchNav from "../components/results-nav"
import {useState,useEffect} from "react"
import {querySearch} from "../http"

function SearchResults(){

    const [searcher,setSearcher] = useSearchParams()
    const [searchInput,setSearchInput] = useState("")
    const [meals,setMeals] = useState([])
    const query = searcher.get("query")

    useEffect(()=>{
        const queryMeals = async ()=>{
            const response = await querySearch({
                searchTerm:query,
            })
        }
        queryMeals()
    },[searcher])

    const navigate = useNavigate()

    const goBack = (num)=>{
        navigate(num)
    }

    const handleChange = (evt)=>{
        const {value} = evt.target;
        setSearchInput(value)
    }

    const handleSearch = ()=>{
        if(searchInput){
            setSearcher({
                query:searchInput
            })
        }
    }


    console.log(query)

    return (
        <div>
            <div className={"fixed top- w-full"}>
                <SearchNav 
                goBack={goBack} 
                num={-1} 
                searchInput={searchInput} 
                handleChange={handleChange}
                handleSearch={handleSearch}/>
            </div>
            <div>

            </div>
        </div>
    )

}

export default SearchResults