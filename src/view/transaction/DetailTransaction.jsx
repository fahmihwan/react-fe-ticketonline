import { useEffect, useState } from "react";
import { SelectEl, TextInputSearchEl } from "../component/InputEl";
import LayoutCustomer from "../layouts/LayoutCustomer";
import { IconPaymentCanceledEl, IconPaymentExpiredEl, IconPaymentSuccessEl, IconPaymentWaitingEl } from "../component/IconSvg";


export default function DetailTransaction() {
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
        <>
            <div className="lg:mx-[400px]">
                <div className="w-full ">
                    <div className="w-full">
                        <b className="text-2xl inline-block mb-5">Detail Transaksi</b>
                    </div>
                    <div className="w-full pt-5 flex">
                        <div className="border w-4/12 mr-5">
                            <img src="/assets/dummy/event-1.png" alt="" />
                            <div className="p-2">
                                <p>Beads Workshop with Round Rope</p>
                                <p>21 Desember 2024</p>
                                <p>Reter Coffe</p>
                            </div>
                            <div className="border px-5 py-2">
                                <p className="text-center">Lihat Detail Acara</p>
                            </div>
                        </div>

                        <div className="border w-8/12">
                            <div className="p-2 ">
                                <b>Detail Pesanan</b>
                            </div>
                            <table className="table-auto w-full border-collapse border border-gray-300">
                                <tbody>
                                    <tr>
                                        <td className=" p-2 border">
                                            <p>Nomor Faktur</p>
                                            <p>yp-1218245131005-73f30a</p>
                                        </td>
                                        <td className="p-2 border-b">
                                            <p>Nomor Faktur</p>
                                            <p>yp-1218245131005-73f30a</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className=" p-2 border">
                                            <p>Nomor Faktur</p>
                                            <p>yp-1218245131005-73f30a</p>
                                        </td>
                                        <td className="p-2 border-b">
                                            <p>Nomor Faktur</p>
                                            <p>yp-1218245131005-73f30a</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border-b">
                                            <p>Nomor Faktur</p>
                                            <p>yp-1218245131005-73f30a</p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="p-2 border-b">
                                            <p>Nomor Faktur</p>
                                            <p>yp-1218245131005-73f30a</p>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>

                        </div>

                    </div>
                </div>
            </div></>
    )
}
