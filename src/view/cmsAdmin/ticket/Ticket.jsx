
import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react';
import { IconEditEl, IconPlusAdminAddEl, IconTrashEl } from '../../component/IconSvg';
import { useEffectEventPagination } from '../../../hook/useEffectEvents';
import { formatDateTimeUtil, formatRupiahUtil } from '../../../utils/utils';
import { PaginationEl } from '../../component/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getEventAdminPagination } from '../../../redux/feature/eventSlice';

const Ticket = () => {
    // const { responseData, paginate, setPaginate } = useEffectEventPagination(); //customeHook
    const dispatch = useDispatch()
    const events = useSelector((state) => state.event.eventData || [])
    const status = useSelector((state) => state.event.status)


    const [paginate, setPaginate] = useState({
        currentPage: 0,
        size: 5,
        totalPages: 0,
        offset: 0,
    })
    useEffect(() => {
        dispatch(getEventAdminPagination({ page: paginate?.currentPage, size: paginate?.size })).then((res) => {
            let response = res.payload.data
            let offset = response.pageable.offset
            let totalPages = response.totalPages
            setPaginate({ ...paginate, offset: offset, totalPages: totalPages })
        })

    }, [dispatch, events?.size, paginate?.currentPage])


    return (
        <>
            <div className='w-full'>
                <div className='flex items-center  justify-between px-5'>
                    <p className='text-3xl font-bold '>Ticket</p>

                </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th>No</th>
                            <th scope="col" className="px-6 py-3">
                                Event
                            </th>
                            <th scope="col" className="px-6 py-3">
                                List Ticket
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {events?.content?.map((d, i) => (
                            <tr key={i} className="bg-white border-b  hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td>
                                    {paginate.offset + i + 1}
                                </td>
                                <td
                                    scope="row"
                                    className="px-6 py-4 font-medium w-[200px] text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    <p>{d?.event_title}</p>
                                    <p>{formatDateTimeUtil(d?.schedule)}</p>
                                    <div>
                                        <img src={d?.image} alt="" width={150} />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <ul className=' space-y-1 text-gray-500 w-full'>
                                        {d?.category_tickets?.map((x, i) => {
                                            return (<li key={i} className='block w-full p-2 bg-white border border-gray-200  mb-5'>
                                                <div className='flex justify-between'>
                                                    <div>
                                                        <b>{x.categoryName}</b><br />
                                                        <div dangerouslySetInnerHTML={{ __html: x?.description }} />
                                                    </div>
                                                    <div className='flex '>
                                                        <div className=''>
                                                            <b className='text-xl'>{formatRupiahUtil(x.price)}</b> <br />
                                                            <p>Qty {x.quotaTicket}</p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </li>)
                                        })}

                                    </ul>
                                </td>
                                <td>
                                    <Link to={`/admin/ticket/${d?.slug}/create`}>
                                        <Button color="blue" size='xs'>
                                            <div className='flex justify-center items-center'>
                                                <IconPlusAdminAddEl />
                                                <span className='ml-1'>Add ticket</span>
                                            </div>
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <PaginationEl
                    setCurrentPage={(params) => {
                        if (params == "next") {
                            setPaginate({
                                ...paginate, currentPage: paginate.currentPage + 1
                            })
                        } else if (params == 'prev') {
                            setPaginate({
                                ...paginate, currentPage: paginate.currentPage - 1
                            })
                        }
                    }}
                    currentPage={paginate.currentPage}
                    totalPages={paginate.totalPages}
                />
            </div>
        </>



    )
}

export default Ticket