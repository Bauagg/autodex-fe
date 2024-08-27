import React, { useEffect } from 'react'
import Viewer from '../Viewer/viewer';
import { useLocation, useNavigate } from 'react-router-dom';

export default function DisplayItem() {
    const location = useLocation()
    const navigate = useNavigate()
    const data = location.state;
    useEffect(()=>{
        if(!data){
            navigate('/menu')
        }
    },[])
    
  return (
    <div className='w-full h-[100vh]'>
       <Viewer selectedUrn={data} />
    </div>
  )
}
