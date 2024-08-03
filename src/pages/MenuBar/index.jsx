import { useState } from "react"
import { DashboardIcon, SettingIcon, ProfileIcon, DesignIcon, SimpleIcon, AdministratorIcon, HubIcon, LeftIcon, RightIcon } from "../../GlobalComponent/icon"

const MenuBar = () => {
    const [activeMenu, setActiceMenu] = useState("Dashboard")
    const [miniNav, setMiniNav] = useState(false)
    return (
        <div className="flex bg-[black] w-full">
            <div className={`h-[100vh] pt-[50px] px-[24px] bg-[#fff] ${miniNav ? "w-[130px]" : "w-[270px]"}`}>
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
                <div className="bg-black rounded-[18px] w-full mt-[30px] py-[10px] px-[15px] text-[#fff] flex gap-[15px] items-center">
                    <div className={miniNav ? "hidden" : "w-[42px] h-[42px] rounded-full bg-[#D9D9D9]"}></div>
                    <div className="font-medium text-[15px]">
                        <p>Michele</p>
                        <p>Admin</p>
                    </div>
                </div>
                <div className="mt-[72px]">
                    <div onClick={() => setActiceMenu("Dashboard")}
                        className={`flex items-center cursor-pointer gap-[10px] px-[16px] py-[12px] bg-[#fff] rounded-[12px] text-[14px] font-medium text-[black] duration-300 ${activeMenu === "Dashboard" ? "pl-[40px]" : ""}`}>
                        <DashboardIcon />
                        <p className={miniNav ? "hidden" : ""}>Dashboard</p>
                    </div>
                    <div onClick={() => setActiceMenu("SimpleViewer")}
                        className={`flex items-center cursor-pointer gap-[10px] px-[16px] py-[12px] bg-[#fff] rounded-[12px] text-[14px] font-medium text-[black] duration-300 mt-[20px] ${activeMenu === "SimpleViewer" ? "pl-[40px]" : ""}`}>
                        <SimpleIcon />
                        <p className={miniNav ? "hidden" : ""}>Simple Viewer</p>
                    </div>
                </div>
                <div className="mt-[87px]">
                    <div onClick={() => setActiceMenu("Setting")}
                        className={`flex items-center cursor-pointer gap-[10px] px-[16px] py-[12px] bg-[#fff] rounded-[12px] text-[14px] font-medium text-[black] duration-300 mt-[20px] ${activeMenu === "Setting" ? "pl-[40px]" : ""}`}>
                        <SettingIcon />
                        <p className={miniNav ? "hidden" : ""}>Setting</p>
                    </div>
                </div>
            </div>
            <div className="text-[#fff] flex items-center justify-center flex-grow">
                {activeMenu === "Dashboard" ? (
                    <p>Dashboard Component Here</p>
                ) : activeMenu === "HubBrowser" ? (
                    <p>HubBrowser Component Here</p>
                ) : activeMenu === "AccAdministrator" ? (
                    <p>AccAdministrator Component Here</p>
                ) : activeMenu === "SimpleViewer" ? (
                    <p>SimpleViewer Component Here</p>
                ) : activeMenu === "HubBrowser" ? (
                    <p>Dashboard Component Here</p>
                ) : activeMenu === "DesignAutomation" ? (
                    <p>DesignAutomation Component Here</p>
                ) : activeMenu === "Profile" ? (
                    <p>Profile Component Here</p>
                ) : activeMenu === "Setting" ? (
                    <p>Setting Component Here</p>
                ) : null}
            </div>
        </div>
    )
}
export default MenuBar