
import LayoutAdmin from '../../layouts/LayoutAdmin'
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { useEffectEventPagination } from '../../../hook/useEffectEvents'
import { PaginationEl } from '../../component/Pagination'
import { formatDateTimeUtil } from '../../../utils/utils'
import { IconEditEl, IconPlusAdminAddEl, IconTrashEl } from '../../component/IconSvg'

const Event = () => {
    const { responseData, paginate, setPaginate } = useEffectEventPagination(); //customeHook
    return (
        <LayoutAdmin>
            <div className='w-full'>
                <div className='flex items-center  justify-between px-5'>
                    <p className='text-3xl font-bold '>Event</p>
                    <Link to="/admin/event/create">
                        <Button color="blue">
                            <div className='flex justify-center items-center'>
                                <IconPlusAdminAddEl />
                                <span className='ml-1'>Add new event</span>
                            </div>
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th>No</th>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Schedule
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {responseData?.content?.map((d, i) => (
                            <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th>
                                    {paginate.offset + i + 1}
                                </th>
                                <td
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    <p>{d?.event_title}</p>
                                    <p className='text-gray-500'>slug : {d?.slug}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <img src={d?.image} alt="" width={150} />
                                    </div>
                                </td>
                                <td className="px-6 py-4">{formatDateTimeUtil(d?.schedule)}</td>
                                <td className="px-6 py-4">
                                    <div
                                        dangerouslySetInnerHTML={{ __html: d?.description }}
                                    /></td>
                                <td className="px-6 py-4">
                                    <div className="flex">
                                        <Link
                                            to={`/admin/event/${d?.slug}/edit`}
                                            className="font-medium mr-5 text-yellow-400  hover:underline"
                                        >
                                            <IconEditEl />
                                        </Link>
                                        <button>
                                            <IconTrashEl />
                                        </button>
                                    </div>
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

export default Event