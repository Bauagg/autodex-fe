import { Route, Routes } from "react-router-dom"

//Componen 
import MenuBar from "../pages/MenuBar/index"
import Register from "../pages/register"
import Login from "../pages/login"


const IndexRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/menu" element={<MenuBar />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </div>
    )
}

export default IndexRouter