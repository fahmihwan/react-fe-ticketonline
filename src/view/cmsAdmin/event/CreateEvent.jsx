import { useState } from 'react'
import LayoutAdmin from '../../layouts/LayoutAdmin'
import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react'
import { InputCKEditorEl, InputDateEl, InputTimeEl, TextareaEl, TextInputEl, UploadFileEl } from '../../component/InputEl'


const CreateEvent = () => {

    const [formData, setFormData] = useState({
        event_title: "",
        scheduleDate: "",
        scheduleTime: "",
        venue: "",
        image: "",
        description: "",
        admin_id: 1
    });




    const handleChange = (e) => {
        let { name, value } = e.target
        setFormData({
            ...formData, [name]: value
        })
    }




    const handleSubmit = () => {
        console.log(formData);
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
                    <TextInputEl
                        placeholder="Event title"
                        handleChange={(e) => handleChange(e)}
                        name="event_title"
                        value={formData?.event_title}
                    />
                    <UploadFileEl
                        placeholder="Upload image"
                        handleChange={(e) => handleChange(e)}
                        name="image"
                        value={formData?.image}
                    />
                    <TextareaEl placeholder="Venue"
                        handleChange={(e) => handleChange(e)}
                        name="venue"
                        value={formData?.venue}
                    />

                    <div className='w-full flex'>
                        <div className='mr-2 w-9/12'>
                            <InputDateEl
                                placeholder="Schedule"
                                handleChange={(date) => {
                                    const year = date.getFullYear()
                                    const month = String(date.getMonth() + 1).padStart(2, '0'); // Menambahkan leading zero untuk bulan
                                    const day = String(date.getDate()).padStart(2, '0'); // Menambahkan leading zero untuk hari
                                    const formattedDate = `${year}-${month}-${day}`;
                                    console.log(formattedDate);
                                    setFormData({ ...formData, "scheduleDate": formattedDate })
                                }}
                                value={formData?.scheduleDate}
                            />
                        </div>
                        <div className='w-3/12'>
                            <InputTimeEl
                                placeholder="Time"
                                handleChange={(e) => handleChange(e)}
                                name="scheduleTime"
                                value={formData?.scheduleTime}
                            />
                        </div>
                    </div>
                    <div>
                        <InputCKEditorEl
                            value={formData?.description}
                            placeholder="Description"
                            handleChange={(event, editor) => {
                                setFormData({ ...formData, "description": editor.getData() })
                            }}
                        />
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