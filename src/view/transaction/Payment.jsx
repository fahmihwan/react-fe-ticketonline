
import { ToggleSwitch } from "flowbite-react";
import { IconPrimaryFormEl, IconSecondaryFormEl } from "../component/IconSvg";
import { PaymentRadioBtnEl, RadioEl, SelectEl, TextInputEl } from "../component/InputEl";
import LayoutCustomer from "../layouts/LayoutCustomer";
import { useEffect, useState } from "react";
import paymentJson from '../../data/paymentType.json';


export default function Payment() {
    const [detailCartTicket, setDetailCartTicket] = useState([]);

    const [selectPayment, setSelectPayment] = useState('')


    useEffect(() => {
        let response = [
            {
                id: 50,
                category_name: "PRESALE",
                price: 25000,
                total: 1,
            },
            {
                id: 51,
                category_name: "EARLYBIRD",
                price: 35000,
                total: 2,
            }

        ]
        setDetailCartTicket(response)
    }, [])

    const handleSubmit = () => {
        console.log(formCustomer);
    }

    return (
        <LayoutCustomer>
            <div className="w-full bg-gray-100 border">
                <div className="w-full my-5 flex justify-center">
                    <StepperCompt />
                </div>
                <div className="lg:mx-[300px]">
                    <div className="w-full flex">
                        <div className="w-full md:w-7/12 m-5 md:m-0 md:mr-5">

                            {paymentJson.data.map((d, i) => {
                                return (
                                    <div key={i} className="bg-white">
                                        <div className="border-b p-3">
                                            <b>{d.type}</b>
                                        </div>
                                        <div className="p-5">
                                            {d.list.map((x, index) => (<PaymentRadioBtnEl
                                                id={x.id}
                                                placeholder={x.title}
                                                img={"/assets/logo-payment/" + x.img}
                                                handleChange={(e) => setSelectPayment(e.target.value)}
                                                selectedValue={selectPayment}
                                                optionValue={x.id}
                                                name={d.name}
                                                key={index} />))}
                                        </div>
                                    </div>
                                )
                            })}


                        </div>
                        <div className="md:flex hidden w-4/12  flex-col">
                            <DetailOrderCompt handleSubmit={handleSubmit}
                                detailCartTicket={detailCartTicket} />
                        </div>
                    </div>
                </div>
            </div>
        </LayoutCustomer>
    )
}

const StepperCompt = () => {
    return (
        <div className="w-full md:w-1/3">
            <ol className="flex items-center w-full text-sm md:text-base justify-center">
                <li className="flex w-[270px] md:w-full items-center text-blue-600  after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-500 after:border-4 after:inline-block ">
                    <span className="flex items-center justify-center text-white w-10 h-10 bg-blue-500 rounded-full lg:h-8 lg:w-8  shrink-0">
                        1
                    </span>
                    <span className="ml-2 w-[300px]">Detail Pembelian</span>
                </li>
                <li className="flex items-center ml-2 ">
                    <span className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full lg:h-8 lg:w-8  shrink-0">
                        2
                    </span>
                    <span className="ml-2 w-[160px] text-blue-600">Metode Pembayaran</span>
                </li>
            </ol>
        </div>
    )
}


const DetailOrderCompt = ({ detailCartTicket, handleSubmit }) => {

    return (
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
                        </tbody>


                    </table>
                </div>
            </div>
            <hr className="my-5" />
            <div className="">
                <p>Tiket Dipesan</p>
                <table className="w-full text-sm">
                    <tbody>
                        {detailCartTicket?.map((d, i) => (
                            <tr key={i} className="text-gray-500">
                                <td>{d.category_name}</td>
                                <td className="text-end">{d.total} X Rp {d.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <hr className="my-5" />
            <div className="flex justify-between">
                <p>Total</p>
                <b>Rp 110.000</b>
            </div>
            <button onClick={(e) => handleSubmit(e)} type="button" className="text-white mt-5 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb">
                Checkout
            </button>
        </div>
    )
}
