import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Viewer from './viewer';

const ViewerAutodex = () => {
    const [models, setModels] = useState([]);
    const [selectedUrn, setSelectedUrn] = useState('');

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

    useEffect(() => {
        getModels();
    }, []);

    const handleModelChange = (event) => {
        setSelectedUrn(event.target.value);
    };

    return (
        <div className="w-full h-full bg-[#FFFF] py-8 px-8 ">
            <section className='flex justify-between items-center mb-10'>
                <div>
                    <div id="header">
                        <select
                            id="models"
                            value={selectedUrn}
                            onChange={handleModelChange}
                            className="block w-full px-4 py-2 pr-8 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500"
                        >
                            <option value="" disabled>
                                Pilih Models...
                            </option>
                            {models.map((option) => (
                                <option key={option.urn} value={option.urn} className='py-[8px] capitalize'>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                        
                    </div>
                </div>
            </section>
            <div>
                <Viewer selectedUrn={selectedUrn} />
            </div>
        </div>
    )
}

export default ViewerAutodex