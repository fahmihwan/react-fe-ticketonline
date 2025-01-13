import { useState } from 'react'
import LayoutAdmin from '../../layouts/LayoutAdmin'
import { Link, useParams } from 'react-router-dom'
import { Button } from 'flowbite-react'
import { TextInputEl } from '../../component/InputEl'

import { IconTrashEl } from '../../component/IconSvg'
import DetailAdminComponent from '../../component/DetailAdminComponent'
import { createLineUp, removeLineUp } from '../../../api/lineUp'
import { useEffecLineUp } from '../../../hook/useEffectLineUp'




const CreateLineup = () => {
    const { slug } = useParams();
    const { responseListLineUp, fetchDataLineUp } = useEffecLineUp(slug)



    const [formData, setFormData] = useState({
        talentName: "Isyana Saraswati",
    });
    const handleSubmit = async () => {
        await createLineUp(formData, slug)
        await fetchDataLineUp(slug)
    }

    const handleChange = (e) => {
        let { name, value } = e.target
        setFormData({
            ...formData, [name]: value
        })
    }

    const handleDelete = async (id) => {
        const isDelete = confirm("Apakah anda ingin menghapus data?");
        if (isDelete) {
            await removeLineUp(id)
            await fetchDataLineUp(slug)
        }
    }

    return (
        <LayoutAdmin>
            <DetailAdminComponent />

            <div className='w-full'>
                <div className='flex items-center  justify-between px-5 mb-0'>
                    <p className='text-3xl font-bold '>Create  Lineup</p>
                </div>
            </div>
            <div className='w-full flex'>
                <div
                    className="block w-1/2 mr-5  p-6 bg-white border border-gray-200 rounded-lg shadow  "
                >
                    <TextInputEl
                        placeholder="Talent Name"
                        handleChange={(e) => handleChange(e)}
                        name="talentName"
                        value={formData?.talentName}
                    />

                    <div className='my-5 flex justify-end'>
                        <Link to="/admin/event" className='mr-3'>
                            <Button >Back</Button>
                        </Link>
                        <Button color="blue" onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>

                <div className='w-1/2 overflow-y-scroll  '>
                    <div className='py-5'>
                        <b>List Line up</b>
                    </div>
                    <div className='h-full '>
                        <div className='h-[100px] '>
                            {responseListLineUp?.length != 0 && responseListLineUp?.map((d, i) => (<TicketListCompt
                                key={i}
                                id={d?.id}
                                talentName={d?.talentName}
                                handleDelete={() => handleDelete(d?.id)}
                            />))}


                        </div>
                    </div>
                </div>
            </div >

        </LayoutAdmin >
    )
}

export default CreateLineup

const TicketListCompt = ({ id, talentName, handleDelete }) => {
    return (
        <div className='border p-5 w-full flex justify-between items-center'>
            <div>
                <h1 className='font-bold'>{talentName}</h1>
            </div>
            <div>
                <Button
                    color='failure'
                    className='flex items-center justify-center align-middle'
                    onClick={(e) => handleDelete(e)}
                >
                    <IconTrashEl color={"text-white"} /></Button>
            </div>
        </div>

    )
}