import { Route, Routes } from "react-router-dom"

//Componen 
import MenuBar from "../pages/MenuBar/index"
import Register from "../pages/register"
import Login from "../pages/login"
import PrivateRoute from "./privateRouter";
import DisplayItem from "../pages/diplay";

const IndexRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/menu" element={<PrivateRoute element={MenuBar} />} />
                <Route path="/view/:id" element={<DisplayItem />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </div>
    )
}

export default IndexRouter