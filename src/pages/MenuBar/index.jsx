import './style-menu.css'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { DashboardIcon, SimpleIcon, LeftIcon, RightIcon, LogoutIcon } from "../../GlobalComponent/icon"
import DashboardPage from '../Dashboard'
import axios from 'axios'
import ViewerAutodex from '../Viewer'

const MenuBar = () => {
    const [activeMenu, setActiceMenu] = useState("Dashboard")
    const [miniNav, setMiniNav] = useState(false)
    const [dataProfile, setDataProfile] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/profil`, { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
            .then((result) => {
                console.log(result.data)
                setDataProfile(result.data.data)
            })
            .catch((err) => console.log(err))
    }, [])

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/');
    }

    const renderProfileName = () => {
        const nameParts = dataProfile.name ? dataProfile.name.split(' ') : [];
        if (nameParts.length > 1) {
            nameParts.pop();
            return nameParts.join(' ');
        }
        return dataProfile.name;
    }

    return (
        <div className="flex bg-[#171821] w-full">
            <div className={`flex items-center justify-center flex-grow bg-[#fff] ${miniNav ? " w-[130px]" : "w-[270px]"}`}>
                <div className='w-1/5 '>
                    <div className={`pt-[50px] px-[24px] bg-[#171821] h-full ${miniNav ? " w-[130px]" : "w-[270px]"} fixed top-0`}>
                        <div className="flex justify-end px-[17px] duration-300">
                            {miniNav ? (
                                <div onClick={() => setMiniNav(false)}>
                                    <RightIcon />
                                </div>
                            ) : (
                                <div onClick={() => setMiniNav(true)}>
                                    <LeftIcon />
                                </div>
                            )}
                        </div>
                        <div className="w-full mt-[30px] py-[10px] px-[15px] text-[#fff] flex gap-[15px] items-center border-b-2 borderProfile pb-[32px]">
                            <div className='w-[42px] h-[42px] rounded-full bg-[#D9D9D9] cursor-pointer'></div>
                            <div className={`${miniNav ? "hidden" : "font-medium text-[15px] cursor-pointer"}`}>
                                <p>{renderProfileName()}</p>
                                <p className='custom-text'>View profile</p>
                            </div>
                        </div>
                        <div className="mt-[52px]">
                            <div onClick={() => setActiceMenu("Dashboard")}
                                className={`hover:bg-[rgba(250,250,250,0.06)] mb-1 hover:text-[#8A7ED8] flex items-center cursor-pointer gap-[10px] px-[16px] py-[12px] rounded-[12px] text-[14px] font-medium duration-300 menuNavbar ${activeMenu === "Dashboard" ? "text-[#8A7ED8] pl-[40px] bg-[rgba(250,250,250,0.06)]" : "text-[#B1B7C4]"}`}>
                                <DashboardIcon className='icon_item' color={activeMenu === "Dashboard" ? "#8A7ED8" : "#B1B7C4"} />
                                <p className={`${miniNav ? "hidden" : ""} `}>Dashboard</p>
                            </div>
                            <div onClick={() => setActiceMenu("SimpleViewer")}
                                className={`hover:bg-[rgba(250,250,250,0.06)] hover:text-[#8A7ED8] flex items-center cursor-pointer gap-[10px] px-[16px] py-[12px] rounded-[12px] text-[14px] font-medium duration-300 menuNavbar ${activeMenu === "SimpleViewer" ? "text-[#8A7ED8] pl-[40px] bg-[rgba(250,250,250,0.06)]" : "text-[#B1B7C4]"}`}>
                                <SimpleIcon className='icon_item' color={activeMenu === "SimpleViewer" ? "#8A7ED8" : "#B1B7C4"} />
                                <p className={miniNav ? "hidden" : ""}>Simple Viewer</p>
                            </div>
                        </div>
                        <div className="mt-[97px]">
                            <p className='text-[#ffff] mb-[14px]'>Other</p>
                            <div onClick={handleLogout}
                                className={`hover:bg-[rgba(250,250,250,0.06)] hover:text-[#8A7ED8] flex items-center cursor-pointer gap-[10px] px-[16px] py-[12px] rounded-[12px] text-[14px] font-medium duration-300 menuNavbar ${activeMenu === "Setting" ? "text-[#8A7ED8] pl-[40px] bg-[rgba(250,250,250,0.06)]" : "text-[#B1B7C4]"}`}>
                                < LogoutIcon className='icon_item' color={activeMenu === "Setting" ? "#8A7ED8" : "#B1B7C4"} />
                                <p className={miniNav ? "hidden" : ""}>Logout</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`items-center justify-center flex-grow bg-[#fff] ${miniNav === false && 'w-4/5'}`}>
                    {activeMenu === "Dashboard" && <DashboardPage />}
                    {activeMenu === "SimpleViewer" && <ViewerAutodex />}
                </div>
            </div>
        </div >
    )
}
export default MenuBar