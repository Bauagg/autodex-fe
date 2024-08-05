import React from 'react'
import { IconBell, IconTotalProject, UploadFileIcon, UploadIcon, FileProjectIcon, BlueprintIcon } from '../../GlobalComponent/icon';

const DashboardPage = () => {

  const datas = [
    {
      icon: <IconTotalProject/>,
      name: 'Total Project',
      num: 10,
    },
    {
      icon: <UploadIcon />,
      name: 'Upload File',
      num: 10,
    },
    {
      icon: <FileProjectIcon/>,
      name: 'File Project',
      num: 10,
    },
    {
      icon: <UploadFileIcon/>,
      name: 'Upload New File',
      num: null,
    },
  ]

  return (
    <main className='w-full h-screen bg-[#FFFF] py-[46px] px-[48px]'>
      <section className='flex justify-between items-center mb-10'>
        <p className='font-semibold text-2xl text-[#171821] capitalize'>dashboard</p>
        <div>
          <IconBell/>
        </div>
      </section>
      <section className='flex space-x-5 w-full'>
        {datas.map((v, i) => {
          return (
          <div key={i} className='w-[263px] h-[107px] bg-[#FFFF] rounded-[18px] py-[30px] px-[15px] flex border border-[#EBEBEB]'>
            <div className='mr-[10px]'>
              {v.icon}
            </div>
            <div className={`flex flex-col ${v.name === 'Upload New File' && 'mt-3'}`}>
              <p className='font-semibold text-sm text-[#171821] capitalize'>{v.name}</p>
              <p className='font-semibold text-2xl text-[#171821] capitalize'>{v.num}</p>
            </div>
          </div>
          )
        })}
      </section>
      <section className='mt-5 w-full h-auto py-[19px] px-[36px]'>
        <div className='w-full flex justify-between mb-[19px]'>
          <div className='flex flex-col'>
            <p className='font-semibold text-[15px] text-[#171821] capitalize'>File History</p>
            <p className='font-semibold text-[10px] text-[#171821] capitalize'>13 Jan - 13 Feb 2025</p>
          </div>
          <div className='flex justify-center items-center bg-[#171821] py-1 pr-4 pl-5 rounded-xl'>
            <UploadFileIcon/>
            <p className='font-semibold text-sm text-[#FFFF] capitalize ml-2'>Upload New File</p>
          </div>
        </div>
        <div className='bg-[#EBEBEB] w-full h-[24px] rounded-lg py-4 px-6 flex items-center mb-2'>
          <div className='mr-[533px]'>
            <p className='font-semibold text-[16px] text-[#171821] capitalize'>File Project</p>
          </div>
          <div>
          <p className='font-semibold text-[16px] text-[#171821] capitalize'>Uploaded by</p>
          </div>
        </div>
        {[1,2,3,4,5,6].map((i) => {
          return (
          <div key={i} className='w-full flex justify-between mb-[19px] py-[18px] px-[24px]'>
            <div className='flex justify-center'>
              <div className='mr-[10px]'>
                <BlueprintIcon/>
              </div>
              <div className='flex-col'>
                  <p className='font-semibold text-[16px] text-[#171821] capitalize'>File 1 3D</p>
                  <p className='font-semibold text-[12px] text-[#171821] capitalize'>1.5 GB</p>
              </div>
            </div>
            <div className='flex items-center'>
                <p className='font-normal text-[16px] text-[#171821] '>rimazakiyatin@gmail.com</p>
            </div>
          </div>
          )
        })}
      </section>
    </main>
  )
}

export default DashboardPage;