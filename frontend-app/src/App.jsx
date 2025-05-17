import routes from "./routes"
import {RouterProvider} from "react-router-dom"
import Context from "./context"

function App(){

  return (
    <Context>
      <RouterProvider router={routes}/>
    </Context>
  )

}

export default App