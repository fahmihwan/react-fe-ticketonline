import { useState } from 'react'
import LayoutAdmin from '../../layouts/LayoutAdmin'
import { Link, useParams } from 'react-router-dom'
import { Button } from 'flowbite-react'
import { InputCKEditorEl, TextInputEl } from '../../component/InputEl'
import { createCategoryTicket, removeCategoryTicket } from '../../../api/categoryTicket'
import { useEffecEventWithCategoryTickets } from '../../../hook/useEffectEvents'
import { formatRupiahUtil } from '../../../utils/utils'
import { IconTrashEl } from '../../component/IconSvg'




const CreateTicket = () => {
    const { slug } = useParams();

    const { responseData, fetchData } = useEffecEventWithCategoryTickets(slug); //customeHook

    const [formData, setFormData] = useState({
        slug: slug,
        categoryName: "Early Bird",
        price: 20000,
        quotaTicket: 300,
        description: "<p>dsd</p>",
    });
    const handleSubmit = async () => {
        createCategoryTicket(formData).then((res) => console.log(res)).catch((err) => console.log(err))
    }

    const handleChange = (e) => {
        let { name, value } = e.target
        setFormData({
            ...formData, [name]: value
        })
    }

    const handleDelete = async (id) => {
        // console.log(id);
        const isDelete = confirm("Apakah anda ingin menghapus data?");
        if (isDelete) {
            await removeCategoryTicket(id)
            await fetchData(slug)
        }

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
                    <TextInputEl
                        placeholder="Category Ticket"
                        handleChange={(e) => handleChange(e)}
                        name="categoryName"
                        value={formData?.categoryName}
                    />
                    <TextInputEl
                        placeholder="Price"
                        handleChange={(e) => handleChange(e)}
                        name="price"
                        type='number'
                        value={formData?.price} />
                    <TextInputEl
                        placeholder="Stock"
                        handleChange={(e) => handleChange(e)}
                        name="quotaTicket"
                        type='number'
                        value={formData?.quotaTicket} />
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
                        <Link to="/admin/ticket" className='mr-3'>
                            <Button >Back</Button>
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
                            {responseData?.category_tickets.length != 0 && responseData?.category_tickets?.map((d, i) => (<TicketListCompt
                                key={i}
                                id={d?.id}
                                categoryName={d?.categoryName}
                                price={d?.price}
                                quotaTicket={d?.quotaTicket}
                                description={d?.description}
                                handleDelete={() => handleDelete(d?.id)}
                            />))}


                        </div>
                    </div>
                </div>
            </div >

        </LayoutAdmin >
    )
}

export default CreateTicket

const TicketListCompt = ({ id, categoryName, price, quotaTicket, description, handleDelete }) => {
    return (
        <div className='border p-5 w-full flex justify-between items-center'>
            <div>
                <h1 className='font-bold'>{categoryName}</h1>
                <p>Price : {formatRupiahUtil(price)}</p>
                <p>Stock : {quotaTicket}</p>
                <div>
                    {/* desciption */}
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                    <samp></samp>
                </div>
            </div>
            <div>
                <Button
                    color='red'
                    className='flex items-center justify-center align-middle'
                    onClick={(e) => handleDelete(e)}
                >
                    <IconTrashEl />
                    Delete</Button>
            </div>
        </div>

    )
}