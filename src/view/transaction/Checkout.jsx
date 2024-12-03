
import { ToggleSwitch } from "flowbite-react";
import { IconPrimaryFormEl, IconSecondaryFormEl } from "../component/IconSvg";
import { RadioEl, SelectEl, TextInputEl } from "../component/InputEl";
import LayoutCustomer from "../layouts/LayoutCustomer";
import { useEffect, useState } from "react";

export default function Checkout() {
    const [formCustomer, setFormCustomer] = useState([]);
    const [detailCartTicket, setDetailCartTicket] = useState([]);

    useEffect(() => {
        let response = [
            {
                id: 50,
                category_name: "PRESALE",
                price: 25000,
                total: 2,
            },
            {
                id: 51,
                category_name: "EARLYBIRD",
                price: 35000,
                total: 0,
            }

        ]
        setDetailCartTicket(response)

        let cartTicket = JSON.parse(JSON.stringify(response));
        let totalTicket = cartTicket.reduce((a, c) => a + c.total, 0)
        let makeArrForm = []

        totalTicket += 1

        let objForm = {
            increment_id: 0,
            gender: "",
            full_name: "",
            email: "",

            d_birth_date: "",
            m_birth_date: "",
            y_birth_date: "",
            telp: "",
            address: ""
        }


        for (let i = 0; i < totalTicket; i++) {
            for (let x = 0; x < cartTicket.length; x++) {
                if (cartTicket[x].total > 0) {
                    cartTicket[x].total--
                    makeArrForm.push({
                        price: cartTicket[x].price,
                        category_name: cartTicket[x].category_name,
                        ...objForm
                    })
                }
            }
        }

        makeArrForm.sort((a, b) => b.price - a.price);
        makeArrForm.unshift({
            price: 0,
            category_name: "detail_pembeli",
            ...objForm
        })

        for (let x = 0; x < makeArrForm.length; x++) {
            makeArrForm[x].increment_id = x
        }

        setFormCustomer(makeArrForm);


    }, [])

    const handleChange = (e, index) => {
        let { name, value } = e.target
        console.log(name);
        if (name.includes('gender')) {
            name = 'gender'
        }
        const updateForm = [...formCustomer];
        updateForm[index] = {
            ...updateForm[index], [name]: value
        }

        console.log(updateForm);
        setFormCustomer(updateForm)
    }
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
                            {formCustomer.map((d, i) => (
                                <FormCardCompt
                                    key={d.increment_id}
                                    category_name={d.category_name}
                                    id={d.increment_id}
                                    full_name={d.full_name}
                                    email={d.email}
                                    gender={d.gender}
                                    d_birth_date={d.d_birth_date}
                                    m_birth_date={d.m_birth_date}
                                    y_birth_date={d.y_birth_date}
                                    telp={d.telp}
                                    address={d.address}
                                    handleChange={(e) => handleChange(e, i)}
                                />
                            ))}

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

const FormCardCompt = ({ id, category_name, full_name, email, gender, d_birth_date, m_birth_date, y_birth_date, telp, address, handleChange }) => {
    const [switch1, setSwitch1] = useState(false);
    return (
        <div className="bg-white border mb-5">
            <div className="flex border-b mb-5 p-3 justify-between">
                <div className="flex">
                    <div className="mr-2">
                        {id == 0 ? (<IconSecondaryFormEl />) : (<IconPrimaryFormEl />)}
                    </div>
                    {id == 0 ? (<b>Detail Pembeli</b>) : (<b>{`Pengunjung ${id}`}</b>)}
                </div>
                <div>
                    {id != 0 && (<ToggleSwitch checked={switch1} label="Sama dengan detail pembeli" onChange={setSwitch1} />)}
                </div>
            </div>
            <div className="px-5">
                {id != 0 && (<div className="border bg-gray-100 px-5 py-2 mb-2 rounded-sm">
                    <p>Kategori Tiket</p>
                    <b>{category_name}</b>
                </div>)}

                <TextInputEl
                    placeholder="Nama Lengkap"
                    handleChange={(e) => handleChange(e)}
                    name="full_name"
                    value={full_name}
                />
                <TextInputEl
                    placeholder="Email"
                    name="email"
                    value={email}
                    handleChange={(e) => handleChange(e)}
                />
                <div className="mb-5">
                    <label
                        htmlFor="error"
                        className="block mb-2 text-sm font-medium "
                    >
                        Jenis Kelamin
                    </label>
                    <div className="flex w-full ">
                        <div className="w-1/2 mr-2">
                            <RadioEl
                                optionValue="L"
                                selectedValue={gender}
                                handleChange={(e) => handleChange(e)}
                                placeholder={"Laki - laki"} name={"gender"} id={"L"} index={id} />
                        </div>
                        <div className="w-1/2">
                            <RadioEl
                                optionValue="P"
                                selectedValue={gender}
                                handleChange={(e) => handleChange(e)}
                                placeholder={"Perempuan"} name={"gender"} id={"P"} index={id} />
                        </div>
                    </div>
                </div>


                <div className="w-full flex mb-5">
                    <div className="w-1/2 mr-2">
                        <SelectEl
                            selectedValue={d_birth_date}
                            name="d_birth_date"
                            handleChange={(e) => handleChange(e)}
                            key={id + "day"} id={id + "day"} placeholder={"Tanggal lahir"} />
                    </div>
                    <div className="w-1/2 mr-2">
                        <SelectEl
                            selectedValue={m_birth_date}
                            key={id + "month"} id={id + "month"} placeholder="&nbsp;" name="m_birth_date"
                            handleChange={(e) => handleChange(e)} />
                    </div>
                    <div className="w-1/2 mr-2">
                        <SelectEl
                            selectedValue={y_birth_date}
                            key={id + "year"} id={id + "year"} placeholder="&nbsp;" name="y_birth_date"
                            handleChange={(e) => handleChange(e)} />
                    </div>
                </div>
                <TextInputEl
                    name="telp"
                    value={telp}
                    handleChange={(e) => handleChange(e)}
                    placeholder="Nomor Telepon" />
                <TextInputEl
                    name="address"
                    value={address}
                    handleChange={(e) => handleChange(e)}
                    placeholder="Alamat" />
            </div>
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
