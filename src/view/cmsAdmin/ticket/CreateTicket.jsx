import { useState } from 'react'
import LayoutAdmin from '../../layouts/LayoutAdmin'
import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react'
import { InputCKEditorEl, TextInputEl } from '../../component/InputEl'



const CreateTicket = () => {
    const [description, setDescription] = useState('')

    const handleSubmit = () => {
        console.log(description);
    }
    return (
        <LayoutAdmin>
            <div className='w-full'>
                <div className='flex items-center  justify-between px-5 mb-5'>
                    <p className='text-3xl font-bold '>Create Ticket</p>
                </div>
            </div>
            <div className='w-full flex'>
                <div
                    className="block w-1/2 mr-5  p-6 bg-white border border-gray-200 rounded-lg shadow  "
                >
                    <TextInputEl placeholder="Category Ticket" />
                    <TextInputEl placeholder="Price" />
                    <TextInputEl placeholder="Stock" />
                    <div>
                        <InputCKEditorEl value={description} handleChange={setDescription} placeholder="description" />
                    </div>
                    <div className='my-5 flex justify-end'>
                        <Link to="/admin/event" className='mr-3'>
                            <Button  >cancel</Button>
                        </Link>
                        <Button color="blue" onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>

                <div className='w-1/2 overflow-y-scroll  '>
                    <div className='py-5'>
                        <b>List Ticket</b>
                    </div>
                    <div className='h-full '>
                        <div className='h-[100px] '>
                            <TicketListCompt />
                            <TicketListCompt />
                            <TicketListCompt />
                            <TicketListCompt />
                            <TicketListCompt />
                            <TicketListCompt />
                        </div>
                    </div>
                </div>
            </div >

        </LayoutAdmin >
    )
}

export default CreateTicket

const TicketListCompt = (params) => {
    return (
        <div className='border p-5 w-full flex justify-between items-center'>
            <div>
                <h1 className='font-bold'>Vakansea</h1>
                <p>Price : Rp 500000</p>
                <p>Stock : 50</p>
                <div>
                    {/* desciption */}
                    dasdlksadlsahdjsahdajsdsadsa
                    dsad
                    sa
                    d
                    <samp></samp>
                </div>
            </div>
            <div>
                <Button>Delete</Button>
            </div>
        </div>

    )
}