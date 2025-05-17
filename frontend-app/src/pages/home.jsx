import {useNavigate} from "react-router-dom"
import Button from "../components/button"

function Home(){

    const navigate = useNavigate()

    const bgImage= 'bg-[url(https://images.pexels.com/photos/2725744/pexels-photo-2725744.jpeg?auto=compress&cs=tinysrgb&w=600)]'

    const handleNavigate = ()=>{
        navigate("menu")
    }

    return (
        <div className={`${bgImage} h-[100vh] bg-no-repeat bg-cover bg-center flex flex-col justify-center`}>
            <div className={'text-center'}> 
                <h2 className={'text-3xl font-extrabold text-orange-500'}>Feeling a little ? very hungry ? or just craving</h2>
                <p className={'text-2xl mt-5'}>Try our meals today and loosen up a bit</p>
                <div>
                    <Button
                    btnInnerText={'See Menu'}
                    btnStyle={'mt-5 py-2 px-5 bg-orange-500 text-white rounded-lg cursor-pointer'}
                    handleClick={handleNavigate}/>
                </div>

            </div>
        </div>
    )

}

export default Home