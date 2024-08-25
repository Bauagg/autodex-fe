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
            <section className='flex justify-between items-center mb-2'>
                <div>
                    <div id="header">
                        <select id="models" value={selectedUrn} onChange={handleModelChange} className="border rounded p-2">
                            {models.map(model => (
                                <option key={model.urn} value={model.urn}>
                                    {model.name}
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