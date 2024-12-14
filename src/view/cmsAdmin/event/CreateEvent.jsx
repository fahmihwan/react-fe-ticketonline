import React, { useState } from 'react'
import LayoutAdmin from '../../layouts/LayoutAdmin'
import { Link } from 'react-router-dom'
import { Button, Datepicker } from 'flowbite-react'
import { InputCKEditorEl, InputDateEl, InputTimeEl, TextareaEl, TextInputEl, UploadFileEl } from '../../component/InputEl'


const CreateEvent = () => {
    const [description, setDescription] = useState('')

    const handleSubmit = () => {
        console.log(description);
    }
    return (
        <LayoutAdmin>
            <div className='w-full'>
                <div className='flex items-center  justify-between px-5 mb-5'>
                    <p className='text-3xl font-bold '>Create event</p>
                </div>
            </div>
            <div className='w-full flex'>
                <div
                    className="block md:w-full lg:w-1/2   mr-5  p-6 bg-white border border-gray-200 rounded-lg shadow  "
                >
                    <TextInputEl placeholder="Event title" />
                    <UploadFileEl placeholder="Upload image" />
                    <TextareaEl placeholder="Venue" />

                    <div className='w-full flex'>
                        <div className='mr-2 w-9/12'>
                            <InputDateEl placeholder="Schedule" />
                        </div>
                        <div className='w-3/12'>
                            <InputTimeEl placeholder="Time" />
                        </div>
                    </div>
                    <div>

                        <InputCKEditorEl value={description} handleChange={setDescription} placeholder="Description" />
                    </div>
                    <div className='my-5 flex justify-end'>
                        <Link to="/admin/event" className='mr-3'>
                            <Button  >cancel</Button>
                        </Link>
                        <Button color="blue" onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>



            </div>

        </LayoutAdmin>
    )
}

export default CreateEvent