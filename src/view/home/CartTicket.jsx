import { useEffect, useState } from "react";
import LayoutCustomer from "../layouts/LayoutCustomer";
import { IconCartEl, IconMinusEl, IconPlusEl } from "../component/IconSvg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDateUtil, formatRupiahUtil } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { findBySlugWithCategoryTickets } from "../../redux/feature/eventSlice";
import { createCartTicket, findCartByUserId } from "../../redux/feature/cartTicketSlice";

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";

export default function CartTicket() {

    const { slug } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const event = useSelector((state) => state.event.detailEvent || {})
    const cartUser = useSelector((state) => state.cart.listCartUser)


    const [openModal, setOpenModal] = useState(false);
    const [listTicket, setListTicket] = useState([]);
    const [totalCheckout, setTotalCheckout] = useState(0)
    const [detailEvent, setDetailEvent] = useState({});
    const [isDisabled, setIsDisabled] = useState(false)



    useEffect(() => {
        if (!slug) {
            return
        }
        dispatch(findCartByUserId({ userId: 1 }))
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
        if (cartUser.length > 0) {
            setOpenModal(true)
        } else {
            handleConfirmSubmit()
        }
    }

    const handleConfirmSubmit = () => {
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
        setIsDisabled(true)
        dispatch(createCartTicket({ payload: payload })).then((res) => {
            if (res.payload.success) {
                navigate(`/event/${slug}/checkout`)

            }
            setIsDisabled(false)

        }).catch((res) => {
            setIsDisabled(false)
        })

    }



    return (
        <LayoutCustomer>
            <div className=" mx-[20px] xl:mx-[300px] my-5">
                <div className="w-full md:flex ">
                    <div className="w-full mb-[30px] md:mb-0 md:w-7/12 mr-5 ">
                        <div className="border px-5 bg-white">
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
                                    totalCheckout > 0 || isDisabled == false && (<table className="w-full text-sm">
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

                            {cartUser.length > 0 && (

                                <Link
                                    to={"/event/${slug}/checkout"} className="flex justify-center px-2 text-center py-3 mt-5 border border-blue-500 bg-blue-200">
                                    <div className="flex items-center">

                                        {/* <svg
                                            aria-hidden="true"
                                            role="status"
                                            className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="#1C64F2"
                                            />
                                        </svg> */}

                                        <span className="text-sm me-4">Kamu Memiliki pesan di keranjnag</span>
                                        <div className="relative">
                                            <div className=""><IconCartEl /></div>
                                            <span className="top-0 start-5 absolute w-3.5 h-3.5 bg-blue-500 border-2 border-white dark:border-gray-800 rounded-full" />
                                        </div>

                                    </div>
                                </Link>)}
                        </div>

                    </div>
                </div>
                <Modal dismissible size="md" show={openModal} className="">
                    <div className="text-center pt-4 font-bold rounded-xl">
                        Checkout
                    </div>

                    <ModalBody className=" py-2 px-5">
                        <div className="space-y-0">
                            <p className="text-center font-normal leading-relaxed text-gray-500 dark:text-gray-400">
                                Jika Anda melanjutkan transaksi ini, pesanan Anda saat ini di keranjang akan dihapus.
                            </p>
                        </div>
                    </ModalBody>
                    <ModalFooter className="flex flex-col p-2 border-0">
                        <Button className="w-full mb-2" color="blue" onClick={() => handleConfirmSubmit()} >Lanjut</Button>
                        <Button className="w-full" color="gray" onClick={() => setOpenModal(false)}>
                            Tutup
                        </Button>
                    </ModalFooter>
                </Modal>




            </div>
        </LayoutCustomer >
    )
}