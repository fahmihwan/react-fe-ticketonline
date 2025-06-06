import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEventByCheckerUser } from '../../redux/feature/eventSlice'
import { formatDateTimeUtil } from '../../utils/utils'

const DashboardChecker = () => {
    const user = JSON.parse(localStorage.getItem('auth'))
    const dispatch = useDispatch()

    const [event, setEvent] = useState({})

    useEffect(() => {
        dispatch(getEventByCheckerUser({ userId: user.userId })).then((res) => {
            const data = res.payload.data[0]
            setEvent(data)

        }).catch((err) => {

        });
    }, [])

    return (
        <>
            <div className="w-full flex mb-4">
                <div className="grid grid-cols-3 w-full gap-3">
                    <div className="bg-red-500 text-white p-4">
                        <p>Checker</p>
                        <p className="text-2xl">{user?.email}</p>
                    </div>
                    <div className="bg-blue-500 text-white p-4">
                        <p>Total Pengunjung Masuk</p>
                        <p className="text-2xl">100 / 1000</p>
                    </div>

                    <div className="bg-green-500 text-white p-4">
                        <p>Total pengunjung yang anda scan</p>
                        <p className="text-2xl">20</p>
                    </div>

                </div>
            </div>

            <div className='w-full'>
                {event && (
                    <>
                        <div className='border flex '>
                            <div className='w-1/2'>
                                <img
                                    className="object-cover w-full rounded-t-lg  "
                                    src={event.image}
                                    alt=""
                                />
                            </div>
                            <div className='w-1/2'>
                                <div className="relative overflow-x-auto">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">

                                                <td className="px-6 py-4">Title</td>
                                                <td className="px-6 py-4">{event.eventTitle}</td>
                                            </tr>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                <td className="px-6 py-4">Schedule</td>
                                                <td className="px-6 py-4">{formatDateTimeUtil(event.schedule)}</td>
                                            </tr>
                                            <tr className="bg-white dark:bg-gray-800">
                                                <td className="px-6 py-4">Venue</td>
                                                <td className="px-6 py-4">{event.venue}</td>
                                            </tr>
                                            <tr className="bg-white dark:bg-gray-800">
                                                <td className="px-6 py-4">Description</td>
                                                <td className="px-6 py-4">
                                                    <div className='w-[200px] truncate h-[100px]'>
                                                        <div
                                                            className='truncate w-[200px] text-[10px]'
                                                            dangerouslySetInnerHTML={{ __html: event.description }} />
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </>

                )}
            </div>

        </>

    )
}

export default DashboardChecker