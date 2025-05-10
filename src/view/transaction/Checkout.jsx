
import { ToggleSwitch } from "flowbite-react";
import { IconPrimaryFormEl, IconSecondaryFormEl } from "../component/IconSvg";
import { RadioEl, SelectEl, TextInputEl, PaymentRadioBtnEl } from "../component/InputEl";
import LayoutCustomer from "../layouts/LayoutCustomer";
import { useEffect, useState } from "react";



import { useDispatch, useSelector } from "react-redux";
import { checkIfCurrentTransactionEventForUserExists, checkoutTransaction, getPaymentMethodDuitku } from "../../redux/feature/transactionSlice";
import { findCartByUserId } from "../../redux/feature/cartTicketSlice";
import { data, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { findBySlugWithCategoryTickets } from "../../redux/feature/eventSlice";
import { formatDateUtil } from "../../utils/utils";


export default function Checkout() {
    const { slug } = useParams();
    const dispatch = useDispatch()
    const paymentDuitku = useSelector((state) => state.transaction.paymentMethod)
    const cartUser = useSelector((state) => state.cart.listCartUser)
    const eventRedux = useSelector((state) => state.event.detailEvent)

    const navigate = useNavigate()
    const [isAlert, setIsAlert] = useState("")


    const [formCustomer, setFormCustomer] = useState([]);
    const [detailCartTicket, setDetailCartTicket] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState('')
    const [step, setStep] = useState(1);
    const [listPayment, setListPayment] = useState([])
    const [firstSubmited, setFirstSubmited] = useState(false)


    // Set initial time to 10 minutes (600 detik)
    let sessionTime = ''
    if (sessionTime) {
        sessionTime = 8 * 60;
    } else {
        sessionTime = 10 * 60;
    }
    const [timeLeft, setTimeLeft] = useState(sessionTime);

    useEffect(() => {
        if (timeLeft === 0) return; // Jika waktu habis, tidak perlu melakukan setInterval lagi

        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000); // Update setiap detik

        // Bersihkan interval saat komponen unmount atau ketika timer selesai
        return () => clearInterval(intervalId);
    }, [timeLeft]);


    // Fungsi untuk mengonversi detik ke format MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const fetchData = async () => {
        await dispatch(checkIfCurrentTransactionEventForUserExists({ userId: 1, slug: slug })).then((res) => {
            const data = res?.payload?.data

            if (data.length > 0) {
                navigate(`/transaction-history/${data[0]?.transaction_code}`);
            }
        })

        await dispatch(findBySlugWithCategoryTickets({ slug: slug }))
        await dispatch(findCartByUserId({ userId: 1, slug: slug })).then(async (result) => {
            const response = result.payload.data
            const totalPrice = response.reduce((sum, item) => sum + item.price * item.total, 0);
            await dispatch(getPaymentMethodDuitku({ payload: { amount: totalPrice } }))
        }).catch((err) => {
            alert(err)
        });
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        let res = paymentDuitku
        let categorizedPayments = {
            "Virtual Account": [],
            "E-Wallet & QRIS": [],
            "Kartu Debit/Kredit": [],
            "Retail Outlets": [],
        };
        res?.paymentFee.forEach(payment => {
            if (payment.paymentMethod.startsWith("VA") || payment.paymentMethod === "B1" || payment.paymentMethod === "BT" || payment.paymentMethod === "A1" || payment.paymentMethod === "I1" || payment.paymentMethod === "M2" || payment.paymentMethod === "AG" || payment.paymentMethod === "BC" || payment.paymentMethod === "BR" || payment.paymentMethod === "NC" || payment.paymentMethod === "BV") {
                categorizedPayments["Virtual Account"].push({ ...payment, "categoryPayment": "Virtual Account" });
            } else if (payment.paymentMethod === "OV" || payment.paymentMethod === "SP" || payment.paymentMethod === "DA" || payment.paymentMethod === "SA" || payment.paymentMethod === "LQ" || payment.paymentMethod === "NQ" || payment.paymentMethod === "OL" || payment.paymentMethod === "IQ" || payment.paymentMethod === "QD" || payment.paymentMethod === "GQ") {
                categorizedPayments["E-Wallet & QRIS"].push({ ...payment, "categoryPayment": "E-Wallet & QRIS" });
            } else if (payment.paymentMethod === "VC") {
                categorizedPayments["Kartu Debit/Kredit"].push({ ...payment, "categoryPayment": "Kartu Debit/Kredit" });
            } else if (payment.paymentMethod === "FT" || payment.paymentMethod === "IR") {
                categorizedPayments["Retail Outlets"].push({ ...payment, "categoryPayment": "Retail Outlets" });
            }
        });

        setListPayment(categorizedPayments)
    }, [paymentDuitku])


    useEffect(() => {

        let response = cartUser

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
            isError: false,
            address: "",
        }


        for (let i = 0; i < totalTicket; i++) {
            for (let x = 0; x < cartTicket.length; x++) {

                if (cartTicket[x].total > 0) {
                    cartTicket[x].total--
                    makeArrForm.push({
                        is_same_credential: false,
                        price: cartTicket[x].price,
                        cart_id: cartTicket[x].id,
                        category_ticket_id: cartTicket[x].category_ticket_id,
                        category_name: cartTicket[x].category_name,
                        ...objForm
                    })
                }
            }
        }



        makeArrForm?.sort((a, b) => b.price - a.price);
        makeArrForm?.unshift({
            price: 0,
            category_name: "detail_pembeli",
            ...objForm
        })

        for (let x = 0; x < makeArrForm?.length; x++) {
            makeArrForm[x].increment_id = x
        }

        let getLocalStorage = JSON.parse(localStorage.getItem('form'))

        for (let x = 0; x < makeArrForm?.length; x++) {
            let isSame = getLocalStorage?.find(item2 => item2.increment_id === makeArrForm[x].increment_id && item2.cart_id == makeArrForm[x].cart_id);
            if (isSame) {
                makeArrForm[x] = isSame
            }
        }




        makeArrForm[0] = fAutoFormCredential(makeArrForm[0])
        setFormCustomer(makeArrForm);

    }, [cartUser])




    const fAutoFormCredential = (makeArrForm) => {
        makeArrForm.full_name = "fahmi ichwanurrohman"
        makeArrForm.email = "fahmiiwan86@gmail.com"
        makeArrForm.gender = "L"
        makeArrForm.d_birth_date = "11"
        makeArrForm.m_birth_date = "Juli"
        makeArrForm.y_birth_date = "1999"
        makeArrForm.telp = "082334337393"
        makeArrForm.address = "Magetan"
        return makeArrForm
    }

    const handleChange = (e, index) => {
        let { name, value } = e.target

        if (name.includes('gender')) {
            name = 'gender'
        }

        let updateForm = [...formCustomer];
        updateForm[index] = {
            ...updateForm[index], [name]: value
        }

        for (let i = 0; i < updateForm.length; i++) {
            if (updateForm[i].is_same_credential) {
                updateForm[i].full_name = updateForm[0].full_name
                updateForm[i].email = updateForm[0].email
                updateForm[i].gender = updateForm[0].gender
                updateForm[i].d_birth_date = updateForm[0].d_birth_date
                updateForm[i].m_birth_date = updateForm[0].m_birth_date
                updateForm[i].y_birth_date = updateForm[0].y_birth_date
                updateForm[i].telp = updateForm[0].telp
                updateForm[i].address = updateForm[0].address
            }
        }
        setFormCustomer(updateForm)
        localStorage.setItem('form', JSON.stringify(updateForm.slice(1)))

    }
    const handleSubmit = () => {



        // const isoString = dateTime.format('YYYY-MM-DDTHH:mm');


        if (step == 1) {
            setFirstSubmited(true)
            const emptyProperties = [];
            formCustomer.map((item, index) => {
                for (let key in item) {
                    if (item[key] === "" || item[key] === null || item[key] === undefined) {
                        emptyProperties.push(key);
                    }
                }

            });

            if (emptyProperties.length > 0) {
                setIsAlert("Mohon lengkapi data")
            } else {
                console.log(formCustomer);
                setIsAlert("")
                setStep(2)
            }


            // setStep(2)
        } else if (step == 2) {


            let duplicateForm = [...formCustomer];

            for (let i = 0; i < duplicateForm.length; i++) {
                const dateString = `${duplicateForm[i].d_birth_date}-${duplicateForm[i].m_birth_date}-${duplicateForm[i].y_birth_date}`;
                const momentDate = moment(dateString, "DD-MMMM-YYYY", 'id');
                const formattedDate = momentDate.format("YYYY-MM-DD");
                duplicateForm[i].birth_date = formattedDate;
            }


            let payload = {
                slug: slug,
                paymentMethod: selectedPayment,
                userId: 1,
                participants: duplicateForm,
                detailCartTicket: detailCartTicket,
            }


            dispatch(checkoutTransaction({ payload: payload })).then((res) => {
                if (res?.payload?.success) {
                    window.open(res.payload.data.paymentUrl, '_blank');
                    navigate(`/transaction-history/${res.payload?.data?.transaction_code}`)
                } else {
                    alert('gagal')
                }
            })
        }

    }

    return (
        <>
            <div className="w-full bg-gray-100 border">
                <div className="bg-yellow-300 w-full py-1 text-center">
                    <b> {formatTime(timeLeft)}</b> Waktu pengisian data
                </div>
                <div className="w-full my-5 flex justify-center">
                    <StepperCompt step={step} />
                </div>


                <div className="mx-5 md xl:mx-[300px]">
                    <div className="w-full flex">
                        <div className="w-full md:w-7/12 m-5 md:m-0 md:mr-5">

                            {isAlert.length != 0 && (
                                <div
                                    className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                                    role="alert"
                                >
                                    <svg
                                        className="shrink-0 inline w-4 h-4 me-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div>
                                        <span className="font-medium">{isAlert}</span>
                                    </div>
                                </div>
                            )
                            }

                            {step == 1 ? (formCustomer.map((d, i) => (

                                <FormCardCompt
                                    firstSubmited={firstSubmited}
                                    isSameCredential={d.is_same_credential}
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

                            ))) : (
                                <>
                                    <CardPaymentCompt
                                        listPayment={listPayment}
                                        categoryPayment={"Virtual Account"}
                                        setSelectedPayment={setSelectedPayment}
                                        selectedPayment={selectedPayment}
                                    />
                                    <CardPaymentCompt
                                        listPayment={listPayment}
                                        categoryPayment={"E-Wallet & QRIS"}
                                        setSelectedPayment={setSelectedPayment}
                                        selectedPayment={selectedPayment}
                                    />
                                    <CardPaymentCompt
                                        listPayment={listPayment}
                                        categoryPayment={"Kartu Debit/Kredit"}
                                        setSelectedPayment={setSelectedPayment}
                                        selectedPayment={selectedPayment}
                                    />
                                    <CardPaymentCompt
                                        listPayment={listPayment}
                                        categoryPayment={"Retail Outlets"}
                                        setSelectedPayment={setSelectedPayment}
                                        selectedPayment={selectedPayment}
                                    />



                                </>



                            )}


                        </div>
                        <div className="md:flex hidden w-4/12  flex-col">
                            <DetailOrderCompt
                                step={step}
                                handleSubmit={handleSubmit}
                                detailCartTicket={detailCartTicket}
                                selectedPayment={selectedPayment}
                                title={eventRedux?.event_title}
                                venue={eventRedux?.venue}
                                schedule={eventRedux?.schedule}
                                image={eventRedux?.image}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </>




    )
}

const CardPaymentCompt = ({ listPayment, categoryPayment, setSelectedPayment, selectedPayment }) => {
    return (
        <div className="bg-white mb-5">
            <div className="border-b p-3">
                <b>{categoryPayment}</b>
            </div>
            <div className="grid grid-cols-2 gap-4 p-5 ">
                {listPayment[categoryPayment]?.map((x, i) => {
                    return (<PaymentRadioBtnEl
                        id={x.paymentMethod}
                        placeholder={x.paymentName}
                        img={x.paymentImage}
                        handleChange={(e) => setSelectedPayment(e.target.value)}
                        selectedValue={selectedPayment}
                        optionValue={x.paymentMethod}
                        name={x.paymentMethod}
                        key={i} />)
                })}
            </div>
        </div>
    )
}

const StepperCompt = ({ step }) => {

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
                    <span className={`flex items-center justify-center w-10 h-10 ${step == 1 ? "bg-gray-400" : "bg-blue-500"} text-white rounded-full lg:h-8 lg:w-8  shrink-0`}>
                        2
                    </span>
                    <span className={`ml-2 w-[160px] ${step == 1 ? "text-gray-500" : "text-blue-600"}`}>Metode Pembayaran</span>
                </li>
            </ol>
        </div>
    )
}

const FormCardCompt = ({ id, category_name, full_name, email, gender, d_birth_date, m_birth_date, y_birth_date, telp, address, isSameCredential, handleChange, firstSubmited }) => {

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
                    {id != 0 && (<ToggleSwitch checked={isSameCredential}
                        label="Sama dengan detail pembeli"
                        onChange={(value) => {
                            handleChange({
                                target: {
                                    name: "is_same_credential",
                                    value: value
                                }
                            })

                        }}
                    />)}
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
                    readOnly={isSameCredential}
                    value={full_name}
                    isError={firstSubmited && full_name == ''}
                />
                <TextInputEl
                    placeholder="Email"
                    name="email"
                    readOnly={isSameCredential}
                    value={email}
                    handleChange={(e) => handleChange(e)}
                    isError={firstSubmited && email == ''}
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
                                readOnly={isSameCredential}
                                selectedValue={gender}
                                handleChange={(e) => handleChange(e)}
                                placeholder={"Laki - laki"} name={"gender"} id={"L"} index={id}
                                isError={firstSubmited && gender == ''}
                                whichMessageError={1}
                            />

                        </div>
                        <div className="w-1/2">
                            <RadioEl
                                optionValue="P"
                                readOnly={isSameCredential}
                                selectedValue={gender}
                                handleChange={(e) => handleChange(e)}
                                placeholder={"Perempuan"} name={"gender"} id={"P"} index={id}
                                isError={firstSubmited && gender == ''}
                                whichMessageError={2} />
                        </div>
                    </div>
                </div>


                <div className="w-full flex mb-5">
                    <div className="w-1/2 mr-2">
                        <SelectEl
                            readOnly={isSameCredential}
                            selectedValue={d_birth_date}
                            name="d_birth_date"
                            handleChange={(e) => handleChange(e)}
                            key={id + "day"} id={id + "day"} placeholder={"Tanggal lahir"}
                            isError={firstSubmited && d_birth_date == ''}
                            whichMessageError={1}
                        />
                    </div>
                    <div className="w-1/2 mr-2">
                        <SelectEl
                            readOnly={isSameCredential}
                            selectedValue={m_birth_date}
                            key={id + "month"} id={id + "month"} placeholder="&nbsp;" name="m_birth_date"
                            handleChange={(e) => handleChange(e)}
                            isError={firstSubmited && m_birth_date == ''}
                            whichMessageError={2}
                        />
                    </div>
                    <div className="w-1/2 mr-2">
                        <SelectEl
                            readOnly={isSameCredential}
                            selectedValue={y_birth_date}
                            key={id + "year"} id={id + "year"} placeholder="&nbsp;" name="y_birth_date"
                            isError={firstSubmited && y_birth_date == ''}
                            handleChange={(e) => handleChange(e)}
                            whichMessageError={3}
                        />
                    </div>
                </div>
                <TextInputEl
                    name="telp"
                    value={telp}
                    readOnly={isSameCredential}
                    handleChange={(e) => handleChange(e)}
                    isError={firstSubmited && telp == ''}
                    placeholder="Nomor Telepon" />
                <TextInputEl
                    readOnly={isSameCredential}
                    name="address"
                    value={address}
                    handleChange={(e) => handleChange(e)}
                    isError={firstSubmited && address == ''}
                    placeholder="Alamat" />
            </div>
        </div>
    )
}


const DetailOrderCompt = ({ step, detailCartTicket, handleSubmit, selectedPayment, title, venue, schedule, image }) => {


    return (
        <div className="border bg-white p-5 mb-3 ">
            <p className="font-extrabold mb-5">Detail Pesanan</p>
            <div className="flex w-full">
                <div className="w-1/2 mr-2">
                    <img src={image} alt="" />
                </div>
                <div className="w-1/2">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="w-44 ">
                                        <p className="font-bold truncate">
                                            {title}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>{formatDateUtil(schedule)}</td>
                            </tr>
                            <tr className="">
                                <td className="w-[200px] max-w-[200px] truncate whitespace-nowrap overflow-hidden">{venue}</td>
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
            {step == 1 ? (<button onClick={(e) => handleSubmit(e)} type="button" className="text-white mt-5 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb">
                Pilih metode pembayaran
            </button>) : (<button
                onClick={(e) => handleSubmit(e)} type="button" className={` mt-5 w-full ${selectedPayment ? " bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-p" : "bg-gray-400 cursor-not-allowed"} font-medium rounded-lg text-sm px-5 py-2.5 me-2 text-white`}>
                Bayar Sekarang
            </button>)}

        </div>
    )
}
