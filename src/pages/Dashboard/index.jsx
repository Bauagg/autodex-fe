import React, { useEffect, useState } from 'react'
import {
  IconBell,
  IconTotalProject,
  CreateProjectIcon,
  TrashIcon,
} from '../../GlobalComponent/icon';
import ModalCreateProject from '../Modals';
import Cookies from "js-cookie";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FolderProject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataProject, setDataProject] = useState([])
  console.log(dataProject);
  
  const [totalProject, setTotalProject] = useState(0)
  const token = Cookies.get('token');
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/projek`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setDataProject(res.data.datas)
        setTotalProject(res.data.total_projek)

      })
      .catch((err) => {
        console.log(err)
        alert('Could not list models. See the console for more details.');
      })
  }, [isModalOpen, token])

  const deleteProject = (id) => {

    axios.delete(`${process.env.REACT_APP_API_URL}/api/projek/${id}`,
      { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        // Fetch project data again after deletion
        axios.get(`${process.env.REACT_APP_API_URL}/api/projek`,
          { headers: { Authorization: `Bearer ${token}` } })
          .then((res) => {
            setDataProject(res.data.datas);
            setTotalProject(res.data.total_projek);
          })
          .catch((err) => {
            console.log('Error fetching projects after deletion:', err);
            alert('Could not list models. See the console for more details.');
          });
      })
      .catch((err) => {
        console.log('Error deleting project:', err); // Debugging error
        alert('Could not delete project. See the console for more details.');
      });
  }


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  return (
    <main className="w-full h-screen bg-[#FFFF] py-[30px] px-[30px]">
      <ModalCreateProject isOpen={isModalOpen} onClose={closeModal} />
      <section className="flex justify-between items-center mb-10">
        <p className="font-semibold text-2xl text-[#171821] capitalize">
          dashboard
        </p>
        <div>
          <IconBell />
        </div>
      </section>
      <section className="flex space-x-5 w-full ">
        <div className="w-[263px] h-[107px] bg-[#FFFF] rounded-[18px] py-[30px] px-[15px] flex border border-[#EBEBEB] mb-5">
          <div className="mr-[10px]">
            <IconTotalProject />
          </div>
          <div className={`flex flex-col`}>
            <p className="font-semibold text-sm text-[#171821] capitalize">
              Total Project
            </p>
            <p className="font-semibold text-2xl text-[#171821] capitalize">
              {totalProject}
            </p>
          </div>
        </div>
      </section>
      {/* ---- */}
      <section className="mb-10">
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
      </section>
      {/* ----- */}
      <section className="grid grid-cols-3 gap-4">
        {dataProject.map((i) => {
          return (
            <div
            onClick={()=>navigate(`/menu/${i.nama_folder}` , { state: i })}
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
      </section>
    </main>
  );
};

export default FolderProject;