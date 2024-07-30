import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
    return (
        <div className="flex w-full h-[100vh] justify-center items-center">
            <h1 onClick={()=>navigate("/menu")} className="hover:scale-[1.5] duration-300 cursor-pointer">Menu</h1>
        </div>
    )
}

export default Login