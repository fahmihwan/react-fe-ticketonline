import { Line } from "react-chartjs-2";
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDataStatUi, getFiveNewEvent, getNumberOfTransactionPerMonth } from "../../redux/feature/dashboardSlice";
import { formatDateTimeUtil } from "../../utils/utils";

export default function Dashboard() {
    const dispatch = useDispatch()
    const dataStatUiRedux = useSelector((state) => state.dashboard.dataStatUi || [])
    const dataFiveNewEventRedux = useSelector((state) => state.dashboard.dataFiveNewEvent || [])
    const dataNumberOfTransactionPerMonthRedux = useSelector((state) => state.dashboard.dataNumberOfTransactionPerMonth || [])

    const [totalTransactionPerMonth, setTotalTransactionPerMonth] = useState([])


    useEffect(() => {
        dispatch(getDataStatUi())
        dispatch(getFiveNewEvent())
        dispatch(getNumberOfTransactionPerMonth()).then((result) => {
            const totalTransactionsArray = result?.payload?.data.map(item => item.total_transactions);
            setTotalTransactionPerMonth(totalTransactionsArray)
        }).catch((err) => {

        });
    }, [dispatch])


    // console.log(dataFiveNewEventRedux);

    Chart.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const labels = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return (
        <>
            <div className='w-full'>
                <div className='items-center  justify-between px-5'>
                    <p className='text-3xl font-bold mb-5 '>Event</p>


                    <div className="w-full">

                        <div className="w-full flex mb-4">
                            <div className="grid grid-cols-4 w-full gap-4">
                                <div className="bg-blue-500 text-white p-4">
                                    <p>Total Transaksi</p>
                                    <p className="text-2xl">{dataStatUiRedux?.total_transaksi}</p>
                                </div>

                                <div className="bg-green-500 text-white p-4">
                                    <p>Total Pengguna</p>
                                    <p className="text-2xl">{dataStatUiRedux?.total_users}</p>
                                </div>
                                <div className="bg-red-500 text-white p-4">
                                    <p>Total Event</p>
                                    <p className="text-2xl">{dataStatUiRedux?.total_events}</p>
                                </div>
                                <div className="bg-yellow-500 text-white p-4">
                                    <p>Total TIket</p>
                                    <p className="text-2xl">{dataStatUiRedux?.total_ticket}</p>
                                </div>
                            </div>
                        </div>


                        <div className="w-full md:flex  mb-4">
                            <div className="w-full md:w-8/12 items-center justify-center rounded bg-red-50 mr-5 dark:bg-gray-800">
                                <p className="text-black">Jumlah Transaksi perbulan </p>
                                <div className=" w-full">
                                    <div style={{ width: '800px', height: '400px' }}>
                                        <Line
                                            options={{
                                                responsive: true,
                                                plugins: {
                                                    legend: {
                                                        position: 'top',
                                                    },
                                                    title: {
                                                        display: true,
                                                        text: 'Chart.js Line Chart',
                                                    },
                                                },
                                            }} data={{
                                                labels,
                                                datasets: [
                                                    {
                                                        label: 'Dataset 1',
                                                        data: totalTransactionPerMonth || [],
                                                        borderColor: 'rgb(255, 99, 132)',
                                                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                                    },

                                                ],
                                            }} />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-4/12 items-center justify-center  rounded bg-gray-50 dark:bg-gray-800 p-2">
                                <b className="text-black mb-5 border-b block ">5 Event terbaru</b>
                                <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                                    {dataFiveNewEventRedux?.map((d, i) => (
                                        <li className="pb-3 sm:pb-4" key={i}>
                                            <div className="flex justify-between min-w-0">
                                                <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                                                    {d?.eventTitle}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {formatDateTimeUtil(d?.schedule)}
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-base  text-gray-900 dark:text-white">
                                                {d?.venue}
                                            </div>
                                        </li>

                                    ))}
                                </ul>



                            </div>
                        </div>

                    </div>

                </div>
            </div>


        </>
    )
}