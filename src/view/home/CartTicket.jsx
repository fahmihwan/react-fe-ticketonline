import { useEffect, useState } from "react";
import LayoutCustomer from "../layouts/LayoutCustomer";
import { IconMinusEl, IconPlusEl } from "../component/IconSvg";

export default function CartTicket() {
    // const [showFullText, setShowFullText] = useState(false);
    const [listTicket, setListTicket] = useState([]);


    const [totalCheckout, setTotalCheckout] = useState(0)

    useEffect(() => {
        let data = [
            {
                id: 22,
                category_name: "PRESALE",
                price: 35000,
                total: 0,
                stock: 20,
            },
            {
                id: 23,
                category_name: "EARLY BID",
                price: 25000,
                total: 0,
                stock: 20
            },
        ]


        let total = data.reduce((acc, item) => acc + (item.total), 0)
        setListTicket(data)
        setTotalCheckout(total)
    }, [])

    const fnCountTicket = (item, option) => {
        let getTicket = listTicket.find((d) => d.id == item.id)

        if (option == 'decrement') {
            setTotalCheckout(totalCheckout - 1)
            setListTicket(
                listTicket.map((x) => x.id == item.id ? { ...getTicket, total: getTicket.total - 1 } : x)
            )
        } else if (option == 'increment') {

            if (getTicket.total >= 5) {
                alert("Maksimal 5 tiket untuk setiap transaksi")
            } else {
                if (getTicket.stock > getTicket.total) {
                    setTotalCheckout(totalCheckout + 1)
                    setListTicket(
                        listTicket.map((x) => x.id == item.id ? { ...getTicket, total: getTicket.total + 1 } : x)
                    )
                } else {
                    alert(`stock tiket tersisa : ${getTicket.stock}`)
                }

            }
        }

    }

    return (
        <LayoutCustomer>
            <div className=" mx-[300px] my-5">
                <div className="w-full flex">
                    <div className="w-7/12 mr-5">
                        <div className="border px-5">
                            <p className="font-extrabold text-xl p-5">Kategori Tiket</p>
                            {listTicket.map((item, index) => (
                                <div key={index}>
                                    <div className="border border-gray-400 flex justify-between items-center py-5 px-5 mb-5" >
                                        <div>
                                            <p>{item.category_name}</p>
                                            <b>Rp {item.price}</b>
                                        </div>
                                        <div>
                                            {item.total == 0 ? (
                                                <>
                                                    {item.stock ? (
                                                        <button
                                                            className="border px-5 py-2 border-gray-500 rounded-md text-blue-700 font-bold"
                                                            onClick={() => fnCountTicket(item, 'increment')}>Tambah</button>
                                                    ) : (
                                                        <button
                                                            className="bg-gray-200 border px-5 py-2 rounded-md font-bold">Habis</button>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="flex border items-center">
                                                    <button
                                                        onClick={() => fnCountTicket(item, 'decrement')}
                                                        className="text-4xl w-11 h-11 flex items-center justify-center">
                                                        <IconMinusEl />
                                                    </button>
                                                    <p className="px-5">{item.total}</p>
                                                    <button
                                                        onClick={() => fnCountTicket(item, 'increment')}
                                                        className="text-4xl w-11 h-11 flex items-center justify-center">
                                                        <IconPlusEl />
                                                    </button>
                                                </div>
                                            )}


                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className="w-4/12 flex flex-col">
                        <div className="border bg-white p-5 mb-3 ">
                            <p className="font-extrabold mb-5">Detail Pesanan</p>
                            <div className="flex w-full">
                                <div className="w-1/2 mr-2">
                                    <img src="/assets/dummy/event-1.png" alt="" />
                                </div>
                                <div className="w-1/2">
                                    <table>
                                        <tr>
                                            <td>
                                                <div className="w-44 ">
                                                    <p className="font-bold truncate">
                                                        mentalitafest-1-you-know-who-youre
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>01 Februari 2025</td>
                                        </tr>
                                        <tr>
                                            <td>Yogyakarta</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <hr className="my-5" />
                            <div className="">
                                <p>{totalCheckout} Tiket Dipesan</p>
                                <table className="w-full text-sm">
                                    <tr className="text-gray-500">
                                        <td>Presale</td>
                                        <td className="text-end">2 X Rp 25.000</td>
                                    </tr>
                                    <tr className="text-gray-500">
                                        <td>EARLY BIRD</td>
                                        <td className="text-end">2 X Rp 25.000</td>
                                    </tr>
                                </table>
                            </div>
                            <hr className="my-5" />
                            <div className="flex justify-between">
                                <p>Total</p>
                                <b>Rp 110.000</b>
                            </div>
                            <button type="button" className="text-white mt-5 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb">
                                Checkout
                            </button>
                        </div>

                    </div>


                </div>



            </div>
        </LayoutCustomer >
    )
}