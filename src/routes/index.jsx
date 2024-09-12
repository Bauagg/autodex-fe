import { Route, Routes } from "react-router-dom"

//Componen 
import MenuBar from "../pages/MenuBar/index"
import Register from "../pages/register"
import Login from "../pages/login"
import PrivateRoute from "./privateRouter";
import DisplayItem from "../pages/diplay";
import ProjectDetail from "../pages/projectDetail";

const IndexRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/menu" element={<PrivateRoute element={MenuBar} />} />
                <Route path="/menu/:project-name" element={<PrivateRoute element={ProjectDetail} />} />
                <Route path="/view/:id" element={<DisplayItem />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </div>
    )
}

export default IndexRouter