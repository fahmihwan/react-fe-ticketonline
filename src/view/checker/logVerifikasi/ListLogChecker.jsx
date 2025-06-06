import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listLogChecker } from '../../../redux/feature/ checkerSlice';
import { formatDateTimeUtil, formatDateUtil } from '../../../utils/utils';

const ListLogChecker = () => {
    const auth = JSON.parse(localStorage.getItem('auth'))
    const listLogCheckerRedux = useSelector((state) => state.checker.logChecker)


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listLogChecker({ userId: auth.userId }));
    }, [])

    return (
        <>
            <div className='w-full'>
                <div className='flex items-center  justify-between px-5 mb-5'>
                    <p className='text-3xl font-bold '>Log Checker</p>
                </div>
            </div>
            <div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Scanned At
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ticket Code
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Full Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Birth Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {listLogCheckerRedux?.map((d, i) => (
                                <>
                                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {formatDateTimeUtil(d.scanned_at)}
                                        </th>
                                        <td className="px-6 py-4">{d.ticket_code}</td>
                                        <td className="px-6 py-4">{d.email}</td>
                                        <td className="px-6 py-4">{d.full_name}</td>
                                        <td className="px-6 py-4">{d.address}</td>
                                        <td className="px-6 py-4">{formatDateUtil(d.birth_date)}</td>

                                    </tr>
                                </>
                            ))}


                        </tbody>
                    </table>
                </div>


            </div>

        </>

    )
}

export default ListLogChecker