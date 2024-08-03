import { Route, Routes } from "react-router-dom"

//Componen 
import MenuBar from "../pages/MenuBar/index"
import Register from "../pages/register"


const IndexRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/menu" element={<MenuBar />} />
                <Route path="/" element={<Register />} />
            </Routes>
        </div>
    )
}

export default IndexRouter