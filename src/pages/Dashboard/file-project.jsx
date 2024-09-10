import React, { useEffect, useState } from 'react';
import { IconBell, EyeIcon, TrashIcon, IconTotalProject, UploadFileIcon, UploadIcon, FileProjectIcon, BlueprintIcon } from '../../GlobalComponent/icon';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [models, setModels] = useState([]);
  const [selectedUrn, setSelectedUrn] = useState('');

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const resp = await axios.get(`${process.env.REACT_APP_API_URL}/api/models`);
        setModels(resp.data);
      } catch (err) {
        alert('Could not list models. See the console for more details.');
        console.error(err);
      }
    };
    fetchModels();
  }, []);

  const handleModelChange = (event) => {
    setSelectedUrn(event.target.value);
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    let data = new FormData();
    data.append('model-file', file);
    if (file.name.endsWith('.zip')) {
      const entrypoint = window.prompt('Please enter the filename of the main design inside the archive.');
      data.append('model-zip-entrypoint', entrypoint);
    }
    try {
      const resp = await axios.post(`${process.env.REACT_APP_API_URL}/api/models`, data);
      setModels((prevModels) => [...prevModels, resp.data]);
      setSelectedUrn(resp.data.urn);
    } catch (err) {
      alert(`Could not upload model ${file.name}. See the console for more details.`);
      console.error(err);
    }
  };

  const datas = [
    {
      icon: <IconTotalProject />,
      name: 'Total Project',
      num: 10,
    },
    {
      icon: <UploadIcon />,
      name: 'Upload File',
      num: 10,
    },
    {
      icon: <FileProjectIcon />,
      name: 'File Project',
      num: 10,
    },
    // {
    //   icon: <UploadFileIcon />,
    //   name: 'Upload New File',
    //   num: null,
    // },
  ]

  const getModels = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/api/models`).then((res) => {
      console.log(res);
      setModels(res.data);
    }).
      catch((err) => {
        alert('Could not list models. See the console for more details.');
        console.error(err);
      })
  }

  //-------------------------------------------handle Upload----------------------------------------------------
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate()

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".nwd")) {
      setSelectedFile(file);
      uploadFile(file);
    } else {
      alert("Please select a file with a .nwd extension");
    }
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('modelFile', file);

    axios.post(`${process.env.REACT_APP_API_URL}/api/models`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error uploading file:", err);
      });
  };
  const handleRemoveFile = (name) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/models/${name}`)
      .then((res) => {
        window.location.reload();
      }).catch((err) => {
        console.log(err);
      })
  }
  console.log(models);

  useEffect(() => {
    getModels();
  }, [selectedFile]);
  return (
    <main className='w-full h-screen bg-[#FFFF] py-[30px] px-[30px]'>
      <section className='flex justify-between items-center mb-10'>
        <p className='font-semibold text-2xl text-[#171821] capitalize'>dashboard</p>
        <div>
          <IconBell />
        </div>
      </section>
      {/* <section className='flex space-x-5 w-full'>
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
      </section> */}
      <section className='mt-5 w-full h-auto py-[19px]'>
        <div className='w-full flex justify-between mb-[19px]'>
          <div className='flex flex-col'>
            <p className='font-semibold text-[15px] text-[#171821] capitalize'>File History</p>
            <p className='font-semibold text-[10px] text-[#171821] capitalize'>13 Jan - 13 Feb 2025</p>
          </div>
          <div className='flex justify-center items-center bg-[#171821] py-1 pr-4 pl-5 rounded-xl cursor-pointer'>
            <label htmlFor="file-upload" className="flex items-center cursor-pointer">
              <UploadFileIcon />
              <p className='font-semibold text-sm text-[#FFFF] capitalize ml-2'>Upload New File</p>
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".nwd"
              onChange={handleFileChange}
              style={{ display: 'none' }} // Hide the actual input element
            />
          </div>
        </div>
        <div className='bg-[#EBEBEB] w-full rounded-lg py-4 px-6 flex justify-between mb-2'>
          <div className=''>
            <p className='font-semibold text-[16px] text-[#171821] capitalize'>File Project</p>
          </div>
          <div>
            <p className='font-semibold text-[16px] text-[#171821] capitalize'>Uploaded by</p>
          </div>
        </div>
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
                  <p className='font-semibold text-[16px] text-[#171821] capitalize'>{item.name}</p>
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
                  onClick={() => handleRemoveFile(item.name)}
                  className='hover:bg-[#fff] duration-300 p-[4px] rounded-[4px]'>
                  <TrashIcon />
                </div>
              </div>
            </div>
          )
        })}
      </section>
    </main>
  )
}

export default DashboardPage;