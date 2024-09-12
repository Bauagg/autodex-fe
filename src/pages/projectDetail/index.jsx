import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie'
import axios from 'axios'
import {
    IconBell,
    IconTotalProject,
    CreateProjectIcon,
    TrashIcon,
    UploadFileIcon,
} from '../../GlobalComponent/icon';
import { BlueprintIcon, EyeIcon, } from '../../GlobalComponent/icon';
import { useNavigate } from 'react-router-dom';
import { DashboardIcon, LeftIcon, RightIcon, LogoutIcon } from "../../GlobalComponent/icon"


export default function ProjectDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeMenu, setActiceMenu] = useState("")
    const [miniNav, setMiniNav] = useState(false)
    const [models, setModels] = useState([]);
    const [dataProfile, setDataProfile] = useState({})
    const [selectedFile, setSelectedFile] = useState(null);
    const [data, setData] = useState('');

    // const receivedData = location.state;
    const token = Cookies.get('token');

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/');
    }
    const handleRemoveFile = (name) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/api/models/${name}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                window.location.reload();
            }).catch((err) => {
                console.log(err);
            })
    }
    const uploadFile = (file) => {
        console.log('fungsi dijalankan');
        const receivedData = location.state;
        const body = {
            modelFile: file,
            user_id: receivedData.user_id,
            folder_id: receivedData._id
        }

        axios.post(`${process.env.REACT_APP_API_URL}/api/models`, body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((err) => {
                console.error("Error uploading file:", err);
            });
    };
    const handleFileChange = (event) => {
        console.log('step 1 jalan');

        const file = event.target.files[0];
        if (file && file.name.endsWith(".nwd")) {
            setSelectedFile(file);
            uploadFile(file);
        } else {
            alert("Please select a file with a .nwd extension");
        }
    };
    const renderProfileName = () => {
        const nameParts = dataProfile.name ? dataProfile.name.split(' ') : [];
        if (nameParts.length > 1) {
            nameParts.pop();
            return nameParts.join(' ');
        }
        return dataProfile.name;
    }
    const getModels = () => {
        const receivedData = location.state;
        axios.get(`${process.env.REACT_APP_API_URL}/api/models/${receivedData._id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                console.log(res);

                setModels(res.data.datas);
            }).
            catch((err) => {
                alert('Could not list models. See the console for more details.');
                console.error(err);
            })
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/profil`, { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
            .then((result) => {
                console.log(result.data)
                setDataProfile(result.data.data)
            })
            .catch((err) =>{
                console.log(err);
            })
    }, [])

    useEffect(() => {
        const receivedData = location.state;
        if (receivedData) {
            getModels();
            setData(receivedData)
        }
    }, [selectedFile]);
    return (
        <div className="flex bg-[#171821] w-full">
            <div className={`flex bg-[#fff] w-full`}>
                <div className={`bg-[#171821] px-[32px] sticky h-[100vh]`}>
                    <div className='pl-[24px]'>
                        <div className="w-full mt-[36px] py-[10px] px-[15px] text-[#fff] flex gap-[15px] items-center border-b-2 borderProfile pb-[32px]">
                            <img alt='profile' src='https://i.pinimg.com/236x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg' className='object-cover w-[42px] h-[42px] rounded-full bg-[#D9D9D9] cursor-pointer'></img>
                            <div className={`${miniNav ? "hidden" : "font-medium text-[15px] cursor-pointer"}`}>
                                <p>{renderProfileName()}</p>
                                <p className='custom-text'>View profile</p>
                            </div>
                            <div className="flex justify-end duration-300">
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
                        </div>
                        <div className="mt-[52px]">
                            <div onClick={() => navigate('/menu')}
                                className={`hover:bg-[rgba(250,250,250,0.06)] mb-1 hover:text-[#8A7ED8] flex items-center cursor-pointer gap-[10px] px-[16px] py-[12px] rounded-[12px] text-[14px] font-medium duration-300 menuNavbar 
                                ${activeMenu === "Dashboard" ? `${!miniNav && 'pl-[40px]'} text-[#8A7ED8] bg-[rgba(250,250,250,0.06)]` : "text-[#B1B7C4]"}`}>
                                <DashboardIcon className='icon_item' color={activeMenu === "Dashboard" ? "#8A7ED8" : "#B1B7C4"} />
                                <p className={`${miniNav ? "hidden" : ""} `}>Dashboard</p>
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
                <div className="flex-1">
                    <main className="w-full h-screen bg-[#FFFF] py-[30px] px-[30px]">
                        <section className="flex justify-between items-center mb-10">
                            {data ? (
                                <p className="font-semibold text-2xl text-[#171821] capitalize">
                                {data.nama_folder}
                            </p>
                            ): null}
                            <div>
                                <IconBell />
                            </div>
                        </section>
                        <section className='mt-[70px] flex w-full items-center justify-start'>
                            <div className='flex justify-center items-center bg-[#171821] py-1 pr-4 pl-5 rounded-xl cursor-pointer'>
                                <label htmlFor="file-upload" className="flex items-center cursor-pointer">
                                    <UploadFileIcon />
                                    <p className='font-semibold text-sm text-[#FFFF] capitalize ml-2'>Upload File</p>
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept=".nwd"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }} // Hide the actual input element
                                />
                            </div>
                        </section>
                        <section className='mt-[70px] flex w-full items-center justify-start text-[24px] font-semibold text-[#171821]'>
                            <p>3D View</p>
                        </section>
                        <section>
                            {models.map((item, index) => {
                                return (
                                    <div
                                        key={item}
                                        className='w-full flex justify-between mb-[19px] py-[18px] px-[24px] hover:bg-[#EBEBEB] duration-300 rounded-[8px]'>
                                        <div className='flex justify-center'>
                                            <div className='mr-[10px]'>
                                                <BlueprintIcon />
                                            </div>
                                            <div className='flex-col'>
                                                <p className='font-semibold text-[16px] text-[#171821] capitalize'>{item.nama}</p>
                                                <p className='font-semibold text-[12px] text-[#171821] capitalize'>1.5 GB</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-[12px] items-center'>
                                            <div
                                                onClick={() => navigate(`/view/${index + 1}`, { state: item.urn })}
                                                className='cursor-pointer flex gap-[8px] items-center hover:bg-[#fff] duration-300 px-[12px] py-[4px] rounded-[4px]'>
                                                <EyeIcon />
                                                <p>View</p>
                                            </div>
                                            <div
                                                onClick={() => handleRemoveFile(item._id)}
                                                className='hover:bg-[#fff] duration-300 p-[4px] rounded-[4px]'>
                                                <TrashIcon />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </section>
                        {/* <section className="flex space-x-5 w-full ">
                            <div className="w-[263px] h-[107px] bg-[#FFFF] rounded-[18px] py-[30px] px-[15px] flex border border-[#EBEBEB] mb-5">
                                <div className="mr-[10px]">
                                    <IconTotalProject />
                                </div>
                                <div className={`flex flex-col`}>
                                    <p className="font-semibold text-sm text-[#171821] capitalize">
                                        Total Project
                                    </p>
                                    <p className="font-semibold text-2xl text-[#171821] capitalize">
                                        {`totalProject`}
                                    </p>
                                </div>
                            </div>
                        </section> */}
                        {/* ---- */}
                        {/* <section className="mb-10">
                            <div onClick={openModal} className="py-[19px] px-9 h-[102px] w-full border border-[#EBEBEB] flex justify-start items-center rounded-xl cursor-pointer">
                                <div className="w-[177px] h-[44px] rounded-xl bg-[#171821] border-[.7px] border-[#EAEBED] flex items-center">
                                    <div className="w-[34px] h-[34px] rounded-full flex items-center ml-5 mr-[10px]">
                                        <CreateProjectIcon />
                                    </div>
                                    <p className="font-sans font-semibold text-sm text-[#FFFFFF] capitalize">
                                        Create Project
                                    </p>
                                </div>
                            </div>
                        </section> */}
                        {/* ----- */}
                        {/* <section className="grid grid-cols-3 gap-4">
                            {dataProject.map((i) => {
                                return (
                                    <div
                                        onClick={() => navigate(`/menu/${i.nama_folder}`, { state: i })}
                                        key={i}
                                        className="w-full bg-white rounded-2xl px-5 py-8 border border-gray-300 flex justify-between items-center"
                                    >
                                        <div className="w-full h-[44px] rounded-xl bg-white flex items-center">
                                            <div className="w-[34px] h-[34px] rounded-full bg-pink-300 flex items-center ml-5 mr-3">
                                                <IconTotalProject />
                                            </div>
                                            <p className="font-sans font-semibold text-2xl text-gray-800 capitalize">
                                                {i.nama_folder}
                                            </p>
                                        </div>
                                        <span onClick={() => deleteProject(i._id)}><TrashIcon /></span>
                                    </div>
                                );
                            })}
                        </section> */}
                    </main>
                </div>
            </div>
        </div >
    )
}
