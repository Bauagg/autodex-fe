import { Route, Routes } from "react-router-dom"

//Componen 
import Login from "../pages/login"
import MenuBar from "../pages/MenuBar/index"


const IndexRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/menu" element={<MenuBar />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </div>
    )
}

export default IndexRouter