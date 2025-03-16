
import LayoutAdmin from '../../layouts/LayoutAdmin'
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { PaginationEl } from '../../component/Pagination'
import { formatDateTimeUtil } from '../../../utils/utils'
import { IconEditEl, IconPlusAdminAddEl, IconTrashEl } from '../../component/IconSvg'
import { useDispatch, useSelector } from 'react-redux'

import {
    getEventAdminPagination,
    removeEvent
} from "../../../redux/feature/eventSlice";
import { useEffect, useState } from 'react'

const Event = () => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.event.eventData || [])
    const status = useSelector((state) => state.event.status)


    const [paginate, setPaginate] = useState({
        currentPage: 0,
        size: 5,
        totalPages: 0,
        offset: 0,
    })

    useEffect(() => {
        if (events) {
            setPaginate({ ...paginate, offset: events?.pageable?.offset, totalPages: events?.totalPages })
        }
    }, [events])

    useEffect(() => {
        dispatch(getEventAdminPagination({ page: paginate?.currentPage, size: paginate?.size }))
    }, [paginate?.currentPage, dispatch, events?.size])


    const handleDelete = async (id) => {
        const isDelete = confirm("Apakah anda ingin menghapus data?");
        if (isDelete) {
            await dispatch(removeEvent({ eventId: id }))

            let page = paginate?.currentPage;
            let size = paginate?.size

            if (events.content.length == 1) {
                page != 0 ? page -= 1 : page = 0
                setPaginate({
                    ...paginate, currentPage: page
                })
            }
            await dispatch(getEventAdminPagination({ page: page, size: size }))
        }
    }


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
                                Venue
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3 w-44">
                                Line Up
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            status == 'loading' ? ('wkwk') : (
                                events?.content?.map((d, i) => (
                                    <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th>
                                            {paginate?.offset + i + 1}
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
                                        <td className="px-6 py-4">{d?.venue}</td>
                                        <td className="px-6 py-4">
                                            <div dangerouslySetInnerHTML={{ __html: d?.description }} /></td>
                                        <td className='px-6 py-4'>

                                            <ul className='list-disc'>
                                                {d?.listLineUps.map((x, i) => (
                                                    <li key={i}>{x.talentName}</li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <Link to={`/admin/event/${d?.slug}/lineup`} className='mr-5'>
                                                    <Button color="blue" size='xs'>
                                                        <div className='flex justify-center items-center'>
                                                            <IconPlusAdminAddEl />
                                                            <span className='ml-1'>Add Talent</span>
                                                        </div>
                                                    </Button>
                                                </Link>

                                                <Link
                                                    to={`/admin/event/${d?.slug}/edit`}
                                                    className="font-medium mr-5 text-yellow-400  hover:underline"
                                                >
                                                    <IconEditEl />
                                                </Link>
                                                <button
                                                    onClick={(e) => handleDelete(d?.id)}>
                                                    <IconTrashEl />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )
                        }
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