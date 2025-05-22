import { useEffect, useState } from "react";
import { SelectEl, TextInputSearchEl } from "../component/InputEl";
import LayoutCustomer from "../layouts/LayoutCustomer";
import { IconPaymentCanceledEl, IconPaymentExpiredEl, IconPaymentSuccessEl, IconPaymentWaitingEl } from "../component/IconSvg";
import { useDispatch, useSelector } from "react-redux";
import { getDetailHistoryTransaction } from "../../redux/feature/historiesSlice";
import { Link, useParams } from "react-router-dom";
import { formatDateTimeUtil, formatRupiahUtil, getPaymentMethodName, statusTransactionUtil } from "../../utils/utils";
import { cancelledTransaction } from "../../redux/feature/transactionSlice";


export default function DetailTransaction() {
    const [paymentStatus, setPaymentStatus] = useState("")
    const [data, setData] = useState([])

    const detailTransactionrRedux = useSelector((state) => state.history.detailTransaction)
    const dispatch = useDispatch()
    const { transactionCode } = useParams();

    useEffect(() => {
        dispatch(getDetailHistoryTransaction({ transactionCode: transactionCode }));
    }, [dispatch])

    // console.log(detailTransactionrRedux.transaction_code);

    return (
        <>
            <div className="mx-[40px]  xl:mx-[400px] ">
                <div className="w-full ">
                    <div className="w-full flex justify-between mt-5">
                        <b className="text-2xl inline-block mb-5">Detail Transaksi</b>
                        {detailTransactionrRedux?.transaction_status == 'PENDING' && (
                            <div>
                                <button
                                    type="button"
                                    className="text-red-700 bg-red-300  focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600  focus:outline-none dark:focus:ring-red-800"
                                    onClick={async () => {
                                        await dispatch(cancelledTransaction({ transactionCode: transactionCode }))
                                        await dispatch(getDetailHistoryTransaction({ transactionCode: transactionCode }));
                                    }}
                                >
                                    Batal Transaksi
                                </button>
                                <button
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    onClick={() => {
                                        window.open(detailTransactionrRedux?.payment_url, '_blank');
                                    }}
                                >
                                    Bayar Sekarang
                                </button>
                            </div>
                        )}



                    </div>
                    <div className="w-full pt-5 flex">
                        <div className=" w-4/12 mr-5">
                            <div className="border ">
                                <img src={detailTransactionrRedux?.event?.image} alt="" />
                                <div className="p-2">
                                    <p className="font-semibold">{detailTransactionrRedux?.event?.event_title}</p>
                                    <p>{formatDateTimeUtil(detailTransactionrRedux?.event?.schedule)}</p>
                                    <p>{detailTransactionrRedux?.event?.venue}</p>
                                </div>
                                <div className="border-t px-5 py-2 text-center">
                                    <b><Link className="text-blue-800" to={`/event/${detailTransactionrRedux?.event?.slug}`}>Lihat Detail Acara</Link></b>
                                </div>
                            </div>
                        </div>

                        <div className=" w-8/12">
                            <div className="mb-5  ">
                                <div className="p-2 border ">
                                    <b>Detail Pesanan</b>
                                </div>
                                <table className="table-auto w-full border-collapse  border-gray-300">
                                    <tbody>
                                        <tr>
                                            <td className=" p-2 border-b-2 border-l border-r">
                                                <p className="text-gray-500">Nomor Faktur</p>
                                                <p>{detailTransactionrRedux?.transaction_code}</p>
                                            </td>
                                            <td className="p-2 border-b-2 border-l border-r">
                                                <p className="text-gray-500">Status</p>
                                                <p className={`${statusTransactionUtil(detailTransactionrRedux?.transaction_status)} font-medium`}>{detailTransactionrRedux?.transaction_status}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className=" p-2 border-b-2 border-l border-r">
                                                <p className="text-gray-500">Tanggal Transaksi</p>
                                                <p>{formatDateTimeUtil(detailTransactionrRedux?.transction_date)}</p>
                                            </td>
                                            <td className="p-2 border-b-2 border-l border-r">
                                                <p className="text-gray-500">Jumlah</p>
                                                <p>{detailTransactionrRedux?.total_ticket}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 border-b-2 border-l border-r">
                                                <p className="text-gray-500">Metode Pembayaran</p>
                                                <p>{getPaymentMethodName(detailTransactionrRedux?.payment_method)}</p>
                                            </td>
                                            <td className="p-2 border-b-2 border-l border-r">
                                                <p className="text-gray-500">Virtual account</p>
                                                <p>{detailTransactionrRedux?.virtual_account}</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="p-2 border-b-2 border-l border-r">
                                                <p className="text-gray-500">Total Pembayaran</p>
                                                <p>{formatRupiahUtil(detailTransactionrRedux?.total_price)}</p>
                                            </td>
                                            <td className="p-2 border-b-2 border-l border-r">

                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                            <div className="mb-5 border-l border-t border-r">
                                <div className="p-2 ">
                                    <b>Detail Pembeli</b>
                                </div>
                                <table className="table-auto w-full border-collapse border border-gray-300">
                                    <tbody>
                                        <tr>
                                            <td className=" p-2 border">
                                                <p className="text-gray-500">Email</p>
                                                <p>{detailTransactionrRedux?.user?.email}</p>
                                                <p className="text-gray-500">E-Tiket akan dikirim ke email ini</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className=" p-2 border">
                                                <p className="text-gray-500">Nama Lengkap</p>
                                                <p>{detailTransactionrRedux?.user?.fullName}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="">
                                <div className="border p-5">
                                    <b>Detail Pengunjung</b>
                                </div>
                                <div className="border p-5 bg-gray-50">
                                    {detailTransactionrRedux?.participansList.length && detailTransactionrRedux?.participansList?.map((d, i) => (
                                        <div className="mb-5 border-l border-t border-r bg-white" key={i}>
                                            <div className="p-2 ">
                                                <b>Pengunjung {i + 1}</b>
                                            </div>
                                            <table className="table-auto w-full border-collapse border border-gray-300">
                                                <tbody>
                                                    <tr>
                                                        <td className=" p-2 border">
                                                            <p className="text-gray-500">Kategori Tiket</p>
                                                            <p>{d?.category_name}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className=" p-2 border">
                                                            <p className="text-gray-500">Nama</p>
                                                            <p>{d?.full_name}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className=" p-2 border">
                                                            <p className="text-gray-500">Email</p>
                                                            <p>{d?.email}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className=" p-2 border">
                                                            <p className="text-gray-500">Jenis Kelamin</p>
                                                            <p>{d?.gender}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className=" p-2 border">
                                                            <p className="text-gray-500">Tanggal Lahir</p>
                                                            <p>{d?.birth_date}</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    ))}
                                </div>

                            </div>


                        </div>








                    </div>
                </div>
            </div ></>
    )
}
