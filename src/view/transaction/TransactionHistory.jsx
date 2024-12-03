import { useEffect, useState } from "react";
import { SelectEl, TextInputSearchEl } from "../component/InputEl";
import LayoutCustomer from "../layouts/LayoutCustomer";


export default function TransactionHistory() {
    const [paymentStatus, setPaymentStatus] = useState("")
    const [data, setData] = useState([])

    useEffect(() => {
        let response = [
            {
                id: 1,
                invoice: "invoice-9e775c8aa52021505db8",
                event: "The Krawds s",
                img: "event-1.png",
                transaction_status: "Payment Success",
                transaction_date: "02 Oktober 2022, 05:42 WIB",
                total: "Rp. 78.350"
            },
            {
                id: 2,
                invoice: "invoice-9e775c8aa52021505db8",
                event: "The Krawds",
                img: "event-1.png",
                transaction_status: "Payment Success",
                transaction_date: "02 Oktober 2022, 05:42 WIB",
                total: "Rp. 78.350"
            },
            {
                id: 3,
                invoice: "invoice-9e775c8aa52021505db8",
                event: "The Krawds",
                img: "event-1.png",
                transaction_status: "Payment Success",
                transaction_date: "02 Oktober 2022, 05:42 WIB",
                total: "Rp. 78.350"
            },
        ]
        setData(response)
    }, [])

    return (
        <LayoutCustomer>
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
            </div>
        </LayoutCustomer >
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
                    <img src={`/assets/dummy/${img}`} alt="" />
                </div>
                <div className="w-9/12 flex">
                    <div className="w-4/12 flex flex-col justify-between  h-[100%] ">
                        <div>
                            <b>{event}</b>
                            <p>{transaction_status}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Tanggal Transaksi</p>
                            <p>{transaction_date}</p>
                        </div>
                    </div>

                    <div className="flex flex-col-reverse w-4/12">
                        <div>
                            <p className="text-gray-500">Total :</p>
                            <p>{total}</p>
                        </div>
                    </div>
                    <div className="w-4/12 flex justify-end items-end">
                        <button
                            type="button"
                            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                        >
                            Lihat Detail
                        </button>

                    </div>
                </div>
            </div>
        </div>

    )
}