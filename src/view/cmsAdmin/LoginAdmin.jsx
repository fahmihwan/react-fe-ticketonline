import { Line } from "react-chartjs-2";
import { formatDateTimeUtil } from "../../utils/utils";
// import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { IconLogoBrandEl, IconTicketEl } from "../component/IconSvg";



import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { RadioEl, SelectEl, TextInputEl } from "../component/InputEl";
import { TabItem, Tabs } from "flowbite-react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { login, registerAdmin } from "../../redux/feature/userSlice";
import { useNavigate } from "react-router-dom";
export default function LoginAdmin() {
    const dispatch = useDispatch()
    // const dataStatUiRedux = useSelector((state) => state.dashboard.dataStatUi || [])
    const [isActiveMenu, setIsActiveMenu] = useState(0)
    const navigate = useNavigate()

    const [formRegis, setFormRegis] = useState({
        gender: "L",
        fullName: "admin",
        email: "admin@gmail.com",
        d_birth_date: "11",
        m_birth_date: "Juli",
        y_birth_date: "1999",
        telp: "0823233",
        address: "qe",
        password: "qweqwe123",
    })

    const [formLogin, setFormLogin] = useState({
        email: "admin@gmail.com",
        password: "qweqwe123"
    })



    const handleChangeLogin = (e) => {
        const { name, value } = e.target;
        setFormLogin((prev) => ({
            ...prev,
            [name]: value,
        }));
    }



    const handleLogin = () => {
        dispatch(login({
            payload: {
                email: formLogin.email,
                password: formLogin.password
            }
        })).then((res) => {
            if (res.payload.success) {
                const data = res.payload.data

                localStorage.setItem('auth', JSON.stringify(data))
                // window.location.reload()
                navigate('/admin/dashboard')

            }

        })
    }


    const handleClear = (params) => {
        setFormRegis({
            gender: "",
            fullName: "",
            email: "",
            d_birth_date: "",
            m_birth_date: "",
            y_birth_date: "",
            telp: "",
            address: "",
            password: "",
        })
        setFormLogin({
            email: "",
            password: ""
        })

    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name.includes('gender')) {
            name = 'gender'
        }
        setFormRegis((prev) => ({
            ...prev,
            [name]: value,
        }));
    }


    const handleRegis = () => {
        console.log(formRegis);
        let payload = { ...formRegis }
        const dateString = `${formRegis.d_birth_date}-${formRegis.m_birth_date}-${formRegis.y_birth_date}`;
        const momentDate = moment(dateString, "DD-MMMM-YYYY", 'id');
        const formattedDate = momentDate.format("YYYY-MM-DD");

        delete payload.d_birth_date
        delete payload.m_birth_date
        delete payload.y_birth_date
        payload.birthDate = formattedDate;


        dispatch(registerAdmin({ payload: payload })).then((result) => {
            console.log(result);
            window.location.reload()
        }).catch((err) => {

        });
    }
    return (
        <>
            <div className='w-full h-[100vh] flex items-center justify-center bg-gray-100'>
                <form className={`border border-blue-700 mx-auto p-5  ${isActiveMenu == 0 ? 'w-[500px]' : 'w-[800px]'}  bg-white`}>
                    <div className="flex-col items-center mb-2 ">
                        <div className=" flex justify-center">
                            <IconLogoBrandEl />
                        </div>
                        <b className="text-center text-4xl block">Login Admin </b>
                    </div>
                    <div className="py-5">
                        <Tabs
                            onActiveTabChange={(tabIndex) => setIsActiveMenu(tabIndex)}
                            aria-label="Full width tabs" variant="fullWidth">
                            <TabItem active title="Masuk" >
                                <div className="py-5">
                                    <div className="mb-5">
                                        <div className="mb-2 block">
                                            <Label htmlFor="email">Email</Label>
                                        </div>
                                        <TextInput
                                            id="email"
                                            placeholder="name@company.com"
                                            name="email"
                                            value={formLogin.email}
                                            onChange={(e) => handleChangeLogin(e)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="password">Kata Sandi</Label>
                                        </div>
                                        <TextInput id="password" type="password"
                                            name="password"
                                            value={formLogin.password}
                                            onChange={(e) => handleChangeLogin(e)}
                                            required />
                                    </div>
                                    <div className="flex justify-between py-2 mt-5">
                                        <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">
                                            Lupa Password?
                                        </a>
                                    </div>
                                    <div className="w-full ">
                                        <Button color="blue" onClick={() => handleLogin()} fullSized>Masuk</Button>
                                    </div>
                                </div>

                            </TabItem>
                            <TabItem title="Daftar">
                                <div className="flex">
                                    <div className="mr-2 w-full">
                                        <TextInputEl
                                            placeholder="Nama Lengkap"
                                            handleChange={(e) => handleChange(e)}
                                            name="fullName"
                                            value={formRegis.fullName}
                                        />
                                    </div>
                                    <div className="mr-2 w-full">
                                        <TextInputEl

                                            placeholder="Email"
                                            handleChange={(e) => handleChange(e)}
                                            name="email"
                                            value={formRegis.email}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <TextInputEl
                                        name="password"
                                        type="password"
                                        value={formRegis.password}
                                        handleChange={(e) => handleChange(e)}
                                        placeholder="Password" />

                                </div>
                                <div className="w-full flex mb-5">
                                    <div className="w-1/2 mr-2">
                                        <SelectEl
                                            selectedValue={formRegis.d_birth_date}
                                            name="d_birth_date"
                                            handleChange={(e) => handleChange(e)}
                                            key={"day"} id={"day"} placeholder={"Tanggal lahir"} />
                                    </div>
                                    <div className="w-1/2 mr-2">
                                        <SelectEl
                                            selectedValue={formRegis.m_birth_date}
                                            key={"month"} id={"month"} placeholder="&nbsp;" name="m_birth_date"
                                            handleChange={(e) => handleChange(e)} />
                                    </div>
                                    <div className="w-1/2 mr-2">
                                        <SelectEl
                                            selectedValue={formRegis.y_birth_date}
                                            key={"year"} id={"year"} placeholder="&nbsp;" name="y_birth_date"
                                            handleChange={(e) => handleChange(e)} />
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-1/2 mr-2">
                                        <TextInputEl
                                            name="telp"
                                            value={formRegis.telp}
                                            handleChange={(e) => handleChange(e)}
                                            placeholder="Nomor Telepon" />
                                    </div>
                                    <div className="mb-5 w-1/2">
                                        <label
                                            htmlFor="error"
                                            className="block mb-2 text-sm font-medium "
                                        >
                                            Jenis Kelamin
                                        </label>
                                        <div className="flex w-full ">
                                            <div>

                                            </div>
                                            <div className="w-1/2 mr-2">
                                                <RadioEl
                                                    optionValue="L"
                                                    selectedValue={formRegis.gender}
                                                    handleChange={(e) => handleChange(e)}
                                                    placeholder={"Laki - laki"} name={"gender"} id={"L"} />
                                            </div>
                                            <div className="w-1/2">
                                                <RadioEl
                                                    optionValue="P"
                                                    selectedValue={formRegis.gender}
                                                    handleChange={(e) => handleChange(e)}
                                                    placeholder={"Perempuan"} name={"gender"} id={"P"} />
                                            </div>
                                        </div>
                                    </div>

                                </div>


                                <TextInputEl
                                    name="address"
                                    value={formRegis.address}
                                    handleChange={(e) => handleChange(e)}
                                    placeholder="Alamat" />

                                <div className="w-full mb-5">
                                    <Button color="blue" onClick={() => handleRegis()} fullSized>Daftar</Button>
                                </div>
                                {/* <p className="text-sm">Dengan menggunakan website ini, membeli tiket, atau membuat akun, Anda setuju dengan Syarat Layanan & Kebijakan Privasi</p> */}
                            </TabItem>
                        </Tabs>

                        {/* <div className="mb-5">
                            <div className="mb-2 block">
                                <Label htmlFor="email">Email</Label>
                            </div>
                            <TextInput
                                id="email"
                                placeholder="name@company.com"
                                name="email"
                                value={formLogin.email}
                                onChange={(e) => handleChangeLogin(e)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password">Kata Sandi</Label>
                            </div>
                            <TextInput id="password" type="password"
                                name="password"
                                value={formLogin.password}
                                onChange={(e) => handleChangeLogin(e)}
                                required />
                        </div>
                        <div className="flex justify-between py-2 mt-5">

                        </div>
                        <div className="w-full flex">
                            <Button color="blue" onClick={() => handleLogin()} fullSized>Masuk</Button>
                        </div> */}
                    </div>

                </form >


            </div >


        </>
    )
}