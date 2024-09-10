import { IconBell, IconTotalProject } from '../../GlobalComponent/icon';

const FolderProject = () => {
    return (
        <main className='w-full h-screen bg-[#FFFF] py-[30px] px-[30px]'>
            <section className='flex justify-between items-center mb-10'>
                <p className='font-semibold text-2xl text-[#171821] capitalize'>dashboard</p>
                <div>
                    <IconBell />
                </div>
            </section>
            <section className='flex space-x-5 w-full'>

                <div className='w-[263px] h-[107px] bg-[#FFFF] rounded-[18px] py-[30px] px-[15px] flex border border-[#EBEBEB]'>
                    <div className='mr-[10px]'>
                        <IconTotalProject />
                    </div>
                    <div className={`flex flex-col `}>
                        <p className='font-semibold text-sm text-[#171821] capitalize'>Total Project</p>
                        <p className='font-semibold text-2xl text-[#171821] capitalize'>10</p>
                    </div>
                </div>

            </section>
        </main>
    )
}


export default FolderProject