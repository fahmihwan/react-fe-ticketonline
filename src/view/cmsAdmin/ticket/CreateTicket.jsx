import { useEffect, useState } from 'react'
import { Await, Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from 'flowbite-react'
import { InputCKEditorEl, TextInputEl } from '../../component/InputEl'
import { formatRupiahUtil } from '../../../utils/utils'
import { IconTrashEl } from '../../component/IconSvg'
import DetailAdminComponent from '../../component/DetailAdminComponent'
import { useDispatch, useSelector } from 'react-redux'
import { findBySlugWithCategoryTickets } from '../../../redux/feature/eventSlice'
import { createCategoryTicket, removeCategoryTicket } from '../../../redux/feature/categoryTicketSlice'




const CreateTicket = () => {
    const { slug } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const events = useSelector((state) => state.event.detailEvent)
    const status = useSelector((state) => state.event.status)


    useEffect(() => {
        dispatch(findBySlugWithCategoryTickets({ slug: slug }))
    }, [dispatch])





    const [formData, setFormData] = useState({
        slug: slug,
        categoryName: "Early Bird",
        price: 20000,
        quotaTicket: 300,
        description: "<p>dsd</p>",
    });
    const handleSubmit = async () => {
        await dispatch(createCategoryTicket({ payload: formData }))
        await dispatch(findBySlugWithCategoryTickets({ slug: slug }))

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
            await dispatch(removeCategoryTicket({ categoryTicketId: id }))
            await dispatch(findBySlugWithCategoryTickets({ slug: slug }))

        }
    }

    return (
        <>
            <DetailAdminComponent />

            <div className='w-full'>
                <div className='flex items-center  justify-between px-5 mb-0'>
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
                            {events?.category_tickets.length != 0 && events?.category_tickets?.map((d, i) => (<TicketListCompt
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

        </>


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
                    color='failure'
                    className='flex items-center justify-center align-middle'
                    onClick={(e) => handleDelete(e)}
                >
                    <IconTrashEl color={"text-white"} /></Button>
            </div>
        </div>

    )
}