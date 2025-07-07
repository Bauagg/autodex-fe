import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

import {
  IconBell,
  TrashIcon,
  UploadFileIcon,
  BlueprintIcon,
  EyeIcon,
  DashboardIcon,
  LeftIcon,
  RightIcon,
  LogoutIcon,
} from '../../GlobalComponent/icon';


export default function ProjectDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const [miniNav, setMiniNav] = useState(false)
    const [models, setModels] = useState([]);
    const [dataProfile, setDataProfile] = useState({})
    const [selectedFile, setSelectedFile] = useState(null);
    const [data, setData] = useState('');

    const token = Cookies.get('token');

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/');
    }

    const handleRemoveFile = (name) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/api/models/${name}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => {
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        })
    }

    const uploadFile = (file) => {
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
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.error("Error uploading file:", err);
            });
    };

    const handleFileChange = (event) => {
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
        axios.get(`${process.env.REACT_APP_API_URL}/api/models/${receivedData._id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            setModels(res.data.datas);
        }).catch((err) => {
            alert('Could not list models. See the console for more details.');
            console.error(err);
        });
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/profil`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((result) => {
            setDataProfile(result.data.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [token])

    useEffect(() => {
        const receivedData = location.state;
        if (receivedData) {
            getModels();
            setData(receivedData)
        }
    }, [selectedFile, location.state]);

    return (
        <div className="flex bg-[#171821] w-full">
            <div className="flex bg-[#fff] w-full">
                <div className="bg-[#171821] px-[32px] sticky h-[100vh]">
                    <div className='pl-[24px]'>
                        <div className="w-full mt-[36px] py-[10px] px-[15px] text-[#fff] flex gap-[15px] items-center border-b-2 borderProfile pb-[32px]">
                            <img alt='profile' src='https://i.pinimg.com/236x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg' className='object-cover w-[42px] h-[42px] rounded-full bg-[#D9D9D9] cursor-pointer' />
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
                            <div
                                onClick={() => navigate('/menu')}
                                className="hover:bg-[rgba(250,250,250,0.06)] mb-1 text-[#B1B7C4] hover:text-[#8A7ED8] flex items-center cursor-pointer gap-[10px] px-[16px] py-[12px] rounded-[12px] text-[14px] font-medium duration-300"
                            >
                                <DashboardIcon className='icon_item' color="#B1B7C4" />
                                <p className={`${miniNav ? "hidden" : ""}`}>Dashboard</p>
                            </div>
                        </div>
                        <div className="mt-[97px]">
                            <p className='text-[#ffff] mb-[14px]'>Other</p>
                            <div
                                onClick={handleLogout}
                                className="hover:bg-[rgba(250,250,250,0.06)] text-[#B1B7C4] hover:text-[#8A7ED8] flex items-center cursor-pointer gap-[10px] px-[16px] py-[12px] rounded-[12px] text-[14px] font-medium duration-300"
                            >
                                <LogoutIcon className='icon_item' color="#B1B7C4" />
                                <p className={miniNav ? "hidden" : ""}>Logout</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <main className="w-full h-screen bg-[#FFFF] py-[30px] px-[30px]">
                        <section className="flex justify-between items-center mb-10">
                            {data && (
                                <p className="font-semibold text-2xl text-[#171821] capitalize">
                                    {data.nama_folder}
                                </p>
                            )}
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
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </section>
                        <section className='mt-[70px] flex w-full items-center justify-start text-[24px] font-semibold text-[#171821]'>
                            <p>3D View</p>
                        </section>
                        <section>
                            {models.map((item, index) => (
                                <div
                                    key={item._id}
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
                                    <div className='flex gap-[12px] items-center'>
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
                            ))}
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
}
