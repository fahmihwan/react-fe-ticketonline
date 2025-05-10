import { useEffect, useState } from "react";
import { SelectEl, TextInputSearchEl } from "../component/InputEl";
import LayoutCustomer from "../layouts/LayoutCustomer";
import { IconPaymentCanceledEl, IconPaymentExpiredEl, IconPaymentSuccessEl, IconPaymentWaitingEl } from "../component/IconSvg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListTransaction } from "../../redux/feature/historiesSlice";
import { formatDateTimeUtil, formatRupiahUtil, statusTransactionUtil } from "../../utils/utils";


export default function TransactionHistory() {
    const [paymentStatus, setPaymentStatus] = useState("")
    const [data, setData] = useState([])

    const historyRedux = useSelector((state) => state.history.history)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getListTransaction({ userId: 1 })).then((res) => {
            let data = res?.payload?.data


            const mappedRes = data.map(d => ({
                invoice: d.transaction_code,
                event: d.event_title,
                img: d.image,
                transaction_status: d.transaction_status,
                transaction_date: d.tgl_transaksi,
                total: d.total_price
            }));

            setData(mappedRes)
        })
    }, [])



    return (
        <>
            <div className="lg:mx-[400px]">
                <div className="w-full ">
                    <div className="w-full">
                        <b className="text-2xl inline-block mb-5">Transaksi</b>
                    </div>
                    <div className="w-full flex">
                        <div className="w-[250px] mr-2">
                            <TextInputSearchEl />
                        </div>
                        <div className="w-[250px]">
                            <SelectEl
                                name="transaction_status"
                                selectedValue={paymentStatus}
                                handleChange={(e) => setPaymentStatus(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full pt-5">
                        {data.length && data.map((d, i) => (
                            <CardTransactionEl key={i} id={d.id}
                                invoice={d.invoice}
                                event={d.event}
                                img={d.img}
                                transaction_status={d.transaction_status}
                                transaction_date={d.transaction_date}
                                total={d.total}
                            />
                        ))}

                    </div>
                </div>
            </div></>
    )
}


const CardTransactionEl = ({ id, invoice, event, img, transaction_date, transaction_status, total }) => {
    return (
        <div className="w-full border mb-10 ">
            <div className="border borer-b bg-gray-200 px-5 py-1">
                {invoice}
            </div>
            <div className="w-full flex p-3">
                <div className="w-3/12 mr-2" style={{ width: "200px" }}>
                    <img src={`${img}`} alt="" />
                </div>
                <div className="w-9/12 flex">
                    <div className="w-4/12 flex flex-col justify-between  h-[100%] ">
                        <div>
                            <b>{event}</b>
                            <div className="flex items-center">
                                <span className={`ml-1 font-medium ${statusTransactionUtil(transaction_status)}`}>{transaction_status}</span></div>
                        </div>
                        <div>
                            <p className="text-gray-500">Tanggal Transaksi</p>
                            <p>{formatDateTimeUtil(transaction_date)}</p>
                        </div>
                    </div>

                    <div className="flex flex-col-reverse w-4/12">
                        <div>
                            <p className="text-gray-500">Total :</p>
                            <p>{formatRupiahUtil(total)}</p>
                        </div>
                    </div>
                    <div className="w-4/12 flex justify-end items-end">
                        <Link to={`/transaction-history/${invoice}`}
                            type="button"
                            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                        >
                            Lihat Detail
                        </Link>

                    </div>
                </div>
            </div>
        </div>

    )
}