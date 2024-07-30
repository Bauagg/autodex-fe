import { Route, Routes } from "react-router-dom"

//Componen 
import Login from "../pages/login"


const IndexRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </div>
    )
}

export default IndexRouter