import React from 'react'
import { formatDateTimeUtil } from '../../utils/utils'

const DetailAdminComponent = ({ title, schedule, venue, description, image }) => {

    return (
        <>
            <div className='flex items-center  justify-between px-5 '>
                <p className='text-3xl font-bold '>Detail</p>
            </div>
            <div className='w-full flex mb-5'>
                <div
                    className=" w-full flex mr-5  p-6 bg-white border border-gray-200 rounded-lg shadow  "
                >
                    <div className='border w-3/12 flex items-center p-2'>
                        <img src={image} alt="" />
                    </div>
                    <div className='w-9/12'>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <tbody>
                                    <tr className=" border-gray-200 ">
                                        <th
                                            scope="row"
                                            className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                                        >
                                            Event
                                        </th>
                                        <td className="px-2 py-4 w-52"> {title}</td>
                                        <th
                                            scope="row"
                                            className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                                        >
                                            Description
                                        </th>
                                        <td className="px-2   " rowSpan={3}>
                                            <div className=' h-[200px]'>
                                                <div
                                                    className='truncate w-[200px] text-[10px]'
                                                    dangerouslySetInnerHTML={{ __html: description }} />
                                            </div>


                                        </td>
                                    </tr>
                                    <tr className=" border-gray-200 ">
                                        <th
                                            scope="row"
                                            className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                                        >
                                            Schedule
                                        </th>
                                        <td className="px-2 py-4">{formatDateTimeUtil(schedule)}</td>
                                    </tr>
                                    <tr className=" border-gray-200 ">
                                        <th
                                            scope="row"
                                            className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                                        >
                                            Venue
                                        </th>
                                        <td className="px-2 py-4">{venue}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>



                </div>
            </div>
        </>

    )
}

export default DetailAdminComponent