import axios from 'axios';
import React, { useState } from 'react';
import Cookies from "js-cookie";

const ModalCreateProject = ({ isOpen, onClose }) => {
  const [projectName, setProjectName] = useState('');
  const token = Cookies.get('token');
  if (!isOpen) return null;

  const createFolderProject = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/api/projek`, { nama_folder: projectName }, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        onClose();
      })
      .catch((err) => {
        alert('Could not list models. See the console for more details.');
        console.error(err);
      })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-[532px] h-[340px] py-[63px] px-[30px] rounded-[22px] bg-[#FFFF] border border-[#00000030] relative">
        <div onClick={onClose} className="mb-3 flex justify-end cursor-pointer">
          <span className="font-semibold text-2xl text-[black]">X</span>
        </div>
        <div>
          <p className="font-sans font-semibold text-2xl text-[#121212] capitalize">
            Nama Project
          </p>
          <input
            type="text"
            placeholder="Buat Nama Project"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-[472px] h-[72px] pl-[20px] py-[24px] outline-none font-sans font-normal text-2xl capitalize mt-4 rounded-xl border border-[#00000030]"
          />
          <button
            onClick={createFolderProject}
            className="w-[100%] mt-5 items-center text-center h-[54px] rounded-xl bg-[#171821] border-[.7px] border-[#EAEBED] text-[#FFFFFF]">
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateProject;
