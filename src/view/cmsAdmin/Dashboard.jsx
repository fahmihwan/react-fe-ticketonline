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

export default function Dashboard() {

    Chart.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    return (
        <>
            <div className='w-full'>
                <div className='items-center  justify-between px-5'>
                    <p className='text-3xl font-bold mb-5 '>Event</p>


                    <div className="w-full">

                        <div className="w-full flex mb-4">
                            <div className="grid grid-cols-4 w-full gap-4">
                                <div className="bg-blue-500 text-white p-4">Total Transaksi</div>
                                <div className="bg-green-500 text-white p-4">Total Pengguna</div>
                                <div className="bg-red-500 text-white p-4">Total Event</div>
                                <div className="bg-yellow-500 text-white p-4">Total TIket</div>
                            </div>
                        </div>


                        <div className="w-full flex mb-4">
                            <div className=" w-8/12 items-center justify-center rounded bg-red-50 mr-5 dark:bg-gray-800">
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
                                                        data: [10, 12, 15, 61],
                                                        borderColor: 'rgb(255, 99, 132)',
                                                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                                    },

                                                ],
                                            }} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-4/12 items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                                <p className="text-black">5 Event dengan transaksi terbanyak</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>


        </>
    )
}