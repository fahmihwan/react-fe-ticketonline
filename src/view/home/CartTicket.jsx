import { useEffect, useState } from "react";
import { IconCartEl, IconMinusEl, IconPlusEl } from "../component/IconSvg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDateUtil, formatRupiahUtil } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventBySlug } from "../../redux/feature/eventSlice";
import { createCartTicket, findCartByUserId } from "../../redux/feature/cartTicketSlice";

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { checkIfCurrentTransactionEventForUserExists } from "../../redux/feature/transactionSlice";
import { setOpenLoginOrRegisUser } from "../../redux/feature/uiSlice";
import { getAllCategoryTicketBySlug } from "../../redux/feature/categoryTicketSlice";

export default function CartTicket() {

    const { slug } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const event = useSelector((state) => state.event.detailEvent || {})
    const cartUser = useSelector((state) => state.cart.listCartUser)
    const transactionExistsRedux = useSelector((state) => state.transaction.transactionExist)


    const [openModal, setOpenModal] = useState(false);
    const [openModalTransaction, setOpenModalTransaction] = useState(false);
    const [listTicket, setListTicket] = useState([]);
    const [totalCheckout, setTotalCheckout] = useState(0)
    const [detailEvent, setDetailEvent] = useState({});
    const [isDisabled, setIsDisabled] = useState(false)



    useEffect(() => {
        if (!slug) {
            return
        }

        const auth = JSON.parse(localStorage.getItem('auth'))
        if (auth) {
            dispatch(checkIfCurrentTransactionEventForUserExists({ userId: auth?.userId, slug: slug }))
            dispatch(findCartByUserId({ userId: auth?.userId, slug: slug }))
        }

        dispatch(fetchEventBySlug({ slug: slug })).then((res) => {


            setDetailEvent({
                id: res.payload.data?.id,
                event_title: res.payload.data?.event_title,
                schedule: res.payload.data?.schedule,
                image: res.payload.data?.image,
                venue: res.payload.data?.venue
            })

        })

    }, [slug, dispatch])


    useEffect(() => {

        dispatch(getAllCategoryTicketBySlug({ slug: slug })).then((result) => {

            let responseTicket = result.payload.data

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
        })


    }, [])


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
        const auth = localStorage.getItem('auth')
        if (auth == null) {
            dispatch(setOpenLoginOrRegisUser({ isMenuActive: true, nameMenuActive: "login" }))
            return
        }

        if (transactionExistsRedux.length > 0) {
            setOpenModalTransaction(true)
        } else {
            if (cartUser.length > 0) {
                setOpenModal(true)
            } else {
                handleConfirmSubmit()
            }
        }
    }

    const handleConfirmSubmit = () => {
        const tickets = listTicket.filter((d) => d.total !== 0).map((d) => {
            return {
                categoryTicketId: d.id,
                total: d.total
            }
        })
        let userId = localStorage.getItem('auth')
        let payload = {
            userId: JSON.parse(userId).userId,
            slug: slug,
            detailTransactions: tickets
        }

        setIsDisabled(true)
        dispatch(createCartTicket({ payload: payload })).then((res) => {
            if (res.payload.success) {
                localStorage.removeItem('form')
                navigate(`/event/${slug}/checkout`)

            }
            setIsDisabled(false)
        }).catch((res) => {
            setIsDisabled(false)
        })

    }



    return (
        <>
            <div className=" mx-[20px] xl:mx-[300px] my-5">
                <div className="w-full md:flex ">
                    <div className="w-full mb-[30px] md:mb-0 md:w-7/12 mr-5 ">
                        <div className="border px-5 bg-white ">
                            <p className="font-extrabold text-xl p-5 ">Kategori Tiket</p>
                            {listTicket.length != 0 ? (listTicket.map((item, index) => (
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
                            ))) : (<div className="h-[380px] flex justify-center items-center ">
                                <div>
                                    <div className="flex justify-center mb-5">
                                        <img src="/assets/fe/not_found.png" alt="" />
                                    </div>
                                    <div className="text-center ">

                                        <p>Tiket Belum tersedia</p>
                                        <p>Daftar kategori tiket akan ditampilkan di sini setelah tersedia.</p>
                                    </div>

                                </div>
                            </div>)}
                        </div>

                    </div>
                    <div className="w-full md:w-4/12 flex flex-col">
                        <div className="border bg-white p-5 mb-3 ">
                            <p className="font-extrabold mb-5">Detail Pesanan</p>
                            <div className="flex w-full">
                                <div className="w-1/2 mr-2">
                                    <img src={event?.image} alt="" />
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
                                                <td className="w-[200px] max-w-[200px] truncate whitespace-nowrap overflow-hidden">{detailEvent?.venue}</td>
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


                            {totalCheckout != 0 ? (<button
                                onClick={handleSubmit}
                                // to={`/event/${slug}/checkout`}
                                type="button" className="block text-center text-white mt-5 w-full bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb">
                                Checkout
                            </button>) : (<button
                                disabled={true}
                                type="button" className="block text-center text-white mt-5 w-full bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb">
                                Checkout TT</button>)}

                            {cartUser.length > 0 && (

                                <Link
                                    to={`/event/${slug}/checkout`} className="flex justify-center px-2 text-center py-3 mt-5 border border-blue-500 bg-blue-200">
                                    <div className="flex items-center">


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

                <Modal dismissible size="md" show={openModalTransaction} className="">
                    <div className="text-center pt-4 font-bold rounded-xl">
                        Selesaikan Transaksi Sebelumnya
                    </div>

                    <ModalBody className=" py-2 px-5">
                        <div className="space-y-0">
                            <p className="text-center font-normal leading-relaxed text-gray-500 dark:text-gray-400">
                                Selesaikan Transaksi Sebelumnya  Mohon selesaikan atau
                                batalkan transaksi sebelumnya agar
                                Anda bisa membuat transaksi baru.
                            </p>
                        </div>
                    </ModalBody>
                    <ModalFooter className="flex flex-col p-2 border-0">
                        <Button className="w-full mb-2" color="blue" onClick={() => {
                            return navigate(`/transaction-history/${transactionExistsRedux[0]?.transaction_code}`)
                        }} >Lihat Transaksi Sebelumnya</Button>


                        <Button className="w-full" color="gray" onClick={() => setOpenModalTransaction(false)}>
                            Tutup
                        </Button>
                    </ModalFooter>
                </Modal>




            </div></>
    )
}