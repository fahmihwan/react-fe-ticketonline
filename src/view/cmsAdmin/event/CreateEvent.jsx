import React, { useState } from 'react'
import LayoutAdmin from '../../layouts/LayoutAdmin'
import { Link } from 'react-router-dom'
import { Button, Datepicker } from 'flowbite-react'
import { InputCKEditorEl, InputDateEl, InputTimeEl, TextInputEl, UploadFileEl } from '../../component/InputEl'


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
                    className="block w-1/2 mr-5  p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 "
                >
                    <TextInputEl placeholder="event title" />
                    <UploadFileEl placeholder="upload image" />
                    <div className='w-full flex'>
                        <div className='mr-2 w-9/12'>
                            <InputDateEl placeholder="schedule" />
                        </div>
                        <div className='w-3/12'>
                            <InputTimeEl placeholder="&nbsp;" />
                        </div>
                    </div>
                    <div>
                        {/*  */}
                        <InputCKEditorEl value={description} handleChange={setDescription} placeholder="description" />
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