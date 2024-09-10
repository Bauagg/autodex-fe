import React, { useState } from 'react';

const ModalCreateProject = ({ isOpen, onClose }) => {
  const [projectName, setProjectName] = useState('');
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-[532px] h-[272px] py-[63px] px-[30px] rounded-[22px] bg-[#FFFF] border border-[#00000030] relative">
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
            className="w-[472px] h-[72px] pl-[20px] py-[24px] outline-none font-sans font-normal text-2xl capitalize text-[#75757569] mt-4 rounded-xl border border-[#00000030]"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalCreateProject;
