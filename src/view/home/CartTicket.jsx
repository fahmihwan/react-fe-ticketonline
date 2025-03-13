import { useEffect, useState } from "react";
import LayoutCustomer from "../layouts/LayoutCustomer";
import { IconMinusEl, IconPlusEl } from "../component/IconSvg";
import { useParams } from "react-router-dom";
import { formatDateUtil, formatRupiahUtil } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { findBySlugWithCategoryTickets } from "../../redux/feature/eventSlice";
import { createCartTicket } from "../../redux/feature/transactionSlice";

export default function CartTicket() {

    const { slug } = useParams();
    const dispatch = useDispatch()
    const event = useSelector((state) => state.event.detailEvent || {})

    const [listTicket, setListTicket] = useState([]);
    const [totalCheckout, setTotalCheckout] = useState(0)
    const [detailEvent, setDetailEvent] = useState({});



    useEffect(() => {
        if (!slug) {
            return
        }

        dispatch(findBySlugWithCategoryTickets({ slug: slug }))
    }, [slug])

    useEffect(() => {
        if (event) {
            setDetailEvent({
                id: event?.id,
                event_title: event?.event_title,
                schedule: event?.schedule,
                image: event?.image,
                venue: event?.venue
            })
        }


        let responseTicket = event?.category_tickets

        if (responseTicket?.length > 0) {
            let customeResponse = [];
            customeResponse = responseTicket?.map((d) => {
                return {
                    id: d?.id,
                    categoryName: d?.categoryName,
                    price: d?.price,
                    total: 0,
                    stock: d?.quotaTicket
                };
            })

            setListTicket(customeResponse)
            setTotalCheckout(customeResponse?.reduce((acc, item) => acc + (item.total), 0))
        }

    }, [event])


    const fnCountTicket = (item, option) => {
        let getTicket = listTicket.find((d) => d.id == item.id)

        if (option == 'decrement') {
            setTotalCheckout(totalCheckout - 1)
            setListTicket(listTicket.map((x) => x.id == item.id ? { ...getTicket, total: getTicket.total - 1 } : x))
        } else if (option == 'increment') {
            if (getTicket.total >= 5) {
                alert("Maksimal 5 tiket untuk setiap transaksi")
            } else {
                if (getTicket.stock > getTicket.total) {
                    setTotalCheckout(totalCheckout + 1)
                    setListTicket(listTicket.map((x) => x.id == item.id ? { ...getTicket, total: getTicket.total + 1 } : x))
                } else {
                    alert(`stock tiket tersisa : ${getTicket.stock}`)
                }
            }
        }
    }

    const fnCalculateTotalPrice = (totalData) => {
        let result = totalData.reduce((acc, item) => {
            acc.totalPrice += item.price * item.total; // menambahkan total harga per item
            acc.totalQuantity += item.total; // menambahkan jumlah total item
            return acc;
        }, { totalPrice: 0, totalQuantity: 0 }); // nilai awal
        return formatRupiahUtil(result?.totalPrice)
    }

    const handleSubmit = () => {
        const tickets = listTicket.filter((d) => d.total !== 0).map((d) => {
            return {
                categoryTicketId: d.id,
                total: d.total
            }
        })

        let payload = {
            slug: slug,
            detailTransactions: tickets
        }

        dispatch(createCartTicket({ payload: payload }))

    }



    return (
        <LayoutCustomer>
            <div className=" mx-[20px] xl:mx-[300px] my-5">
                <div className="w-full md:flex">
                    <div className="w-full mb-[30px] md:mb-0 md:w-7/12 mr-5">
                        <div className="border px-5">
                            <p className="font-extrabold text-xl p-5">Kategori Tiket</p>
                            {listTicket.map((item, index) => (
                                <div key={index}>
                                    <div className="border border-gray-300 flex justify-between items-center py-5 px-5 mb-5" >
                                        <div>
                                            <p>{item?.categoryName}</p>
                                            <b>{formatRupiahUtil(item?.price)}</b>
                                        </div>
                                        <div>
                                            {item.total == 0 ? (
                                                <>
                                                    {item.stock != 0 ? (
                                                        <button
                                                            className="border px-5 py-2 border-gray-300 rounded-md text-blue-700 font-bold"
                                                            onClick={() => fnCountTicket(item, 'increment')}>Tambah</button>
                                                    ) : (
                                                        <button
                                                            className="bg-gray-300 border px-5 py-2 rounded-md font-bold">Habis</button>
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
                    <div className="w-full md:w-4/12 flex flex-col">
                        <div className="border bg-white p-5 mb-3 ">
                            <p className="font-extrabold mb-5">Detail Pesanan</p>
                            <div className="flex w-full">
                                <div className="w-1/2 mr-2">
                                    <img src="/assets/dummy/event-1.png" alt="" />
                                </div>
                                <div className="w-1/2">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="w-44 ">
                                                        <p className="font-bold truncate">
                                                            {detailEvent?.event_title}
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{formatDateUtil(detailEvent?.schedule)}</td>
                                            </tr>
                                            <tr>
                                                <td>{detailEvent?.venue}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <hr className="my-5" />
                            <div className="">
                                <p>{totalCheckout} Tiket Dipesan</p>
                                {
                                    totalCheckout > 0 && (<table className="w-full text-sm">
                                        <tbody>
                                            {listTicket?.map((d, i) => {
                                                if (d?.total != 0) {
                                                    return (
                                                        <tr key={i} className="text-gray-500">
                                                            <td>{d.categoryName}</td>
                                                            <td className="text-end">{d?.total} X {formatRupiahUtil(d?.price)}</td>
                                                        </tr>
                                                    )
                                                }

                                            })}
                                            {/* <tr className="text-gray-500">
                                                <td>Presale</td>
                                                <td className="text-end">2 X Rp 25.000</td>
                                            </tr>
                                            <tr className="text-gray-500">
                                                <td>EARLY BIRD</td>
                                                <td className="text-end">2 X Rp 25.000</td>
                                            </tr> */}
                                        </tbody>
                                    </table>)
                                }
                            </div>
                            <hr className="my-5" />
                            <div className="flex justify-between">
                                <p>Total</p>
                                <p>{fnCalculateTotalPrice(listTicket)}</p>
                                {/* <b>Rp 110.000</b> */}
                            </div>

                            {/* 
                            {totalCheckout != 0 ? (<Link
                                to={`/event/${slug}/checkout`}
                                type="button" className="block text-center text-white mt-5 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb">
                                Checkout
                            </Link>) : (<button
                                disabled={true}
                                type="button" className="block text-center text-white mt-5 w-full bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb">
                                Checkout</button>)} */}

                            {totalCheckout != 0 ? (<button
                                onClick={handleSubmit}
                                // to={`/event/${slug}/checkout`}
                                type="button" className="block text-center text-white mt-5 w-full bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb">
                                Checkout
                            </button>) : (<button
                                disabled={true}
                                type="button" className="block text-center text-white mt-5 w-full bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb">
                                Checkout</button>)}

                            <div className="text-center py-3 mt-5 border border-blue-200 bg-blue-200">
                                Kamu Memiliki pesan di keranjnag
                            </div>
                        </div>

                    </div>


                </div>



            </div>
        </LayoutCustomer >
    )
}