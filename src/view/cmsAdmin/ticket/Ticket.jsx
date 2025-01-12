import LayoutAdmin from '../../layouts/LayoutAdmin'
import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react';
import { IconEditEl, IconPlusAdminAddEl, IconTrashEl } from '../../component/IconSvg';
import { useEffectEventPagination } from '../../../hook/useEffectEvents';
import { formatDateTimeUtil, formatRupiahUtil } from '../../../utils/utils';
import { PaginationEl } from '../../component/Pagination';

const Ticket = () => {
    const { responseData, paginate, setPaginate } = useEffectEventPagination(); //customeHook
    return (
        <LayoutAdmin>
            <div className='w-full'>
                <div className='flex items-center  justify-between px-5'>
                    <p className='text-3xl font-bold '>Event</p>

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
                        {responseData?.content?.map((d, i) => (
                            <tr key={i} className="bg-white border-b  hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td>
                                    {paginate.offset + i + 1}
                                </td>
                                <td
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
                                            return (<li key={i} className='block w-full p-2 bg-white border border-gray-200 rounded-lg shadow mb-5'>
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
                                        <Button color="blue">
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

        </LayoutAdmin>
    )
}

export default Ticket