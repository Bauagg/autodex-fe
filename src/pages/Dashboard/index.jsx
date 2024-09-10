import React, { useState } from 'react'
import {
  IconBell,
  IconTotalProject,
  CreateProjectIcon,
  TrashIcon,
} from '../../GlobalComponent/icon';
import ModalCreateProject from '../Modals';

const FolderProject = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
              10
            </p>
          </div>
        </div>
      </section>
      {/* ---- */}
      <section className="mb-10">
        <div onClick={openModal} className="py-[19px] px-9 h-[102px] w-full border border-[#EBEBEB] flex justify-start items-center rounded-xl cursor-pointer">
          <div className="w-[177px] h-[44px] rounded-xl bg-[#171821] border-[.7px] border-[#EAEBED] flex items-center">
            <div className="w-[34px] h-[34px] rounded-full flex items-center ml-5 mr-[10px]">
              <CreateProjectIcon/>
            </div>
            <p className="font-sans font-semibold text-sm text-[#FFFFFF] capitalize">
              Create Project
            </p>
          </div>
        </div>
      </section>
      {/* ----- */}
      <section className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => {
          return (
            <div
              key={i}
              className="w-full bg-white rounded-2xl px-5 py-8 border border-gray-300 flex justify-between items-center"
            >
              <div className="w-full h-[44px] rounded-xl bg-white flex items-center">
                <div className="w-[34px] h-[34px] rounded-full bg-pink-300 flex items-center ml-5 mr-3">
                  <IconTotalProject />
                </div>
                <p className="font-sans font-semibold text-2xl text-gray-800 capitalize">
                  Project A
                </p>
              </div>
              <TrashIcon />
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default FolderProject;