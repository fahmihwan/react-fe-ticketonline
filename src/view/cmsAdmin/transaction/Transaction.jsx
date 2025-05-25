import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom'
import { allOfTransactionFromUsersAdmin } from '../../../redux/feature/historiesSlice';
import { PaginationNativeEl } from '../../component/Pagination';
import { fGeneratePaginationNumberUtil, getPaymentMethodName, formatDateTimeUtil, formatRupiahUtil, statusTransactionUtil } from '../../../utils/utils';

const Transaction = () => {
    const [data, setData] = useState([])

    const dispatch = useDispatch();
    // const listTransactionRedux = useSelector((state) => state.history.listTransactionAdmin || [])


    const [items, setItems] = useState([]);
    const [paginateSearch, setPaginateSearch] = useState('');
    const [paginatePage, setPaginatePage] = useState(0)
    const [paginateLimit, setpaginateLimit] = useState(10)
    const [paginateTotalItem, setPaginateTotalItem] = useState(0)
    const [paginateTotalPage, setPaginateTotalPage] = useState(0)




    const fetchWithParams = (params) => {
        dispatch(allOfTransactionFromUsersAdmin({ params: `?page=${paginatePage}&size=${paginateLimit}` })).then((result) => {
            const res = result.payload.data
            setItems(res?.data)
            if (res?.page > res?.totalPages) {
                setPaginatePage(0)
            } else {
                setPaginatePage(res?.page)
            }

            setpaginateLimit(res?.size)
            setPaginateTotalItem(res?.totalElements)
            setPaginateTotalPage(res?.totalPages)
        })
    }

    useEffect(() => {
        fetchWithParams()
    }, [paginatePage, paginateLimit])



    return (
        <>
            <div className='w-full'>
                <div className='flex items-center  justify-between px-5'>
                    <p className='text-3xl font-bold '>Transaction</p>
                </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th>No</th>
                            <th scope="col" className="px-6 py-3">
                                Transaction Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Transaksi date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Transaction Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Payment Method
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Event Title
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Qty
                            </th>
                            {/* <th scope="col" className="px-6 py-3">
                                Action
                            </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {items?.length != 0 && items?.map((d, i) => (
                            <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th>
                                    {paginatePage * paginateLimit + i + 1}
                                </th>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {d?.transaction_code}
                                </th>
                                <td className="px-6 py-4">{formatDateTimeUtil(d?.created_at)}</td>
                                <td className={`px-6 py-4 ${statusTransactionUtil(d?.transaction_status)}`}>{d?.transaction_status}</td>
                                <td className="px-6 py-4">{getPaymentMethodName(d?.payment_method)}</td>
                                <td className="px-6 py-4">{d?.event_title}</td>
                                {/* statusTransactionUtil */}
                                <td className="px-6 py-4">{formatRupiahUtil(d?.total_price)}</td>
                                <td className="px-6 py-4">{d?.total_qty}</td>
                                {/* <td className="px-6 py-4">
                                    <Link
                                        to="/admin/ticket/1/create"
                                        className="mr-5 font-medium text-blue-600  hover:underline"
                                    >
                                        add ticket
                                    </Link>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <PaginationNativeEl
                    generatePageNumbers={fGeneratePaginationNumberUtil(paginatePage, paginateTotalPage, paginateLimit)}
                    paginatePage={paginatePage}
                    setPaginatePage={setPaginatePage}
                    paginateTotalPage={paginateTotalPage}
                    paginateTotalItem={paginateTotalItem} />

            </div>
        </>



    )
}

export default Transaction