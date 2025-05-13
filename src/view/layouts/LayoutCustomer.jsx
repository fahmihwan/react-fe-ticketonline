import { Dropdown, Navbar } from "flowbite-react";
import { Link, Outlet } from "react-router-dom";
import { IconLogoBrandEl } from "../component/IconSvg";
import { useState } from "react";


import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { RadioEl, SelectEl, TextInputEl } from "../component/InputEl";
import { TabItem, Tabs } from "flowbite-react";
import { useDispatch } from "react-redux";
import { login, registerUser } from "../../redux/feature/userSlice";
import moment from "moment";

export default function LayoutCustomer() {
    const isAuth = localStorage.getItem('auth')
    const dispatch = useDispatch()
    const [openModalProfile, setOpenModalProfile] = useState(false);
    const [openModalPassword, setOpenModalPassword] = useState(false);
    const [openModalLoginAndRegis, setOpenModalLoginAndRegis] = useState({
        isActive: false,
        menuActive: ""
    });


    const [formRegisOrProfile, setFormRegisOrProfile] = useState({
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
        email: "fahmihwan@example.com",
        password: "qweqwe123"
    })


    const handleClear = (params) => {
        setFormRegisOrProfile({
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
        setFormRegisOrProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    }


    const handleChangeLogin = (e) => {
        const { name, value } = e.target;
        setFormLogin((prev) => ({
            ...prev,
            [name]: value,
        }));
    }


    const handleRegis = () => {
        console.log(formRegisOrProfile);
        let payload = { ...formRegisOrProfile }
        const dateString = `${formRegisOrProfile.d_birth_date}-${formRegisOrProfile.m_birth_date}-${formRegisOrProfile.y_birth_date}`;
        const momentDate = moment(dateString, "DD-MMMM-YYYY", 'id');
        const formattedDate = momentDate.format("YYYY-MM-DD");

        delete payload.d_birth_date
        delete payload.m_birth_date
        delete payload.y_birth_date
        payload.birtDate = formattedDate;


        dispatch(registerUser({ payload: payload })).then((result) => {
            console.log(result);
            window.location.reload()
        }).catch((err) => {

        });
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
                window.location.reload()

            }

        })
    }

    const handleChangeProfile = () => {
        console.log(formRegisOrProfile);
    }

    const handleLogout = () => {
        localStorage.clear()

        window.location.reload()
    }


    return (
        <>
            <Navbar fluid className="shadow-lg flex justify-center items-center ">
                <div className=" w-full flex items-center  ">
                    <Link to={"/"}>
                        <IconLogoBrandEl />
                    </Link>

                    <div className="w-[500px]">
                        <form className="max-w-md mx-auto">
                            <label
                                htmlFor="default-search"
                                className="mb-2 text-sm font-medium text-gray-900 sr-only "
                            >
                                Search
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500 "
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    id="default-search"
                                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 700 "
                                    placeholder="cari berdasarkan artis, acara, atau nama tempat"
                                    required=""
                                />
                                <button
                                    type="submit"
                                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>

                    {isAuth && (
                        <>
                            <Link to="/transaction-history" className="mr-5">Transaksi</Link>
                            <Link className="mr-5">Ticket</Link>

                            <div className="flex ">
                                <Dropdown
                                    arrowIcon={false}
                                    inline
                                    className="w-[300px]"
                                    label={
                                        "porfile"}
                                >
                                    <Dropdown.Header >
                                        Hello, <br /> <b>Fahmi</b>
                                    </Dropdown.Header>
                                    <Dropdown.Item onClick={() => setOpenModalProfile(true)}>
                                        Ubah Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => setOpenModalPassword(true)}>
                                        Ubah Kata Sandi
                                    </Dropdown.Item>

                                    <Dropdown.Divider />
                                    <button >
                                        <Dropdown.Item onClick={() => handleLogout()}>
                                            Logout
                                        </Dropdown.Item>
                                    </button>
                                </Dropdown>
                                <Navbar.Toggle />
                            </div>
                        </>
                    )}
                    {!isAuth && (
                        <div className=" flex">
                            <button
                                onClick={() => setOpenModalLoginAndRegis({
                                    isActive: true,
                                    menuActive: "login"
                                })}
                                type="button"
                                className="text-blue-700 mr-5 bg-blue-100 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  focus:outline-none "
                            >
                                Masuk
                            </button>
                            <button
                                type="button"
                                onClick={() => setOpenModalLoginAndRegis({
                                    isActive: true,
                                    menuActive: "register"
                                })}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2   focus:outline-none "
                            >
                                Daftar
                            </button>

                        </div>
                    )}

                </div>
            </Navbar>

            <div className="w-full bg-[#FAFCFD] relative">
                <Outlet />
                <footer className="bg-white rounded-lg ">
                    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">

                        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                            © 2023{" "}
                            <a href="https://flowbite.com/" className="hover:underline">
                                Flowbite™
                            </a>
                            . All Rights Reserved.
                        </span>
                    </div>
                </footer>
            </div>


            {/* MENU PROFILE */}
            <Modal show={openModalProfile} onClose={() => {
                setOpenModalProfile(false)
                handleClear()
            }}>
                <Modal.Header >
                    <b className="">Profil</b>
                    <p className="text-[12px]">Mengubah profil tidak akan mengubah data pada tiket yang telah dibeli</p>
                </Modal.Header>
                <Modal.Body>
                    <TextInputEl
                        placeholder="Nama Lengkap"
                        handleChange={(e) => handleChange(e)}
                        name="fullName"
                        value={formRegisOrProfile.fullName}
                    />
                    <TextInputEl
                        placeholder="Email"
                        handleChange={(e) => handleChange(e)}
                        name="email"
                        readOnly={true}
                        messageInfo="Email tidak dapat diubah"
                        value={formRegisOrProfile.email}
                    />

                    <div className="w-full flex mb-5">
                        <div className="w-1/2 mr-2">
                            <SelectEl
                                selectedValue={formRegisOrProfile.d_birth_date}
                                name="d_birth_date"
                                handleChange={(e) => handleChange(e)}
                                key={"day"} id={"day"} placeholder={"Tanggal lahir"} />
                        </div>
                        <div className="w-1/2 mr-2">
                            <SelectEl
                                selectedValue={formRegisOrProfile.m_birth_date}
                                key={"month"} id={"month"} placeholder="&nbsp;" name="m_birth_date"
                                handleChange={(e) => handleChange(e)} />
                        </div>
                        <div className="w-1/2 mr-2">
                            <SelectEl
                                selectedValue={formRegisOrProfile.y_birth_date}
                                key={"year"} id={"year"} placeholder="&nbsp;" name="y_birth_date"
                                handleChange={(e) => handleChange(e)} />
                        </div>
                    </div>
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
                                    selectedValue={formRegisOrProfile.gender}
                                    handleChange={(e) => handleChange(e)}
                                    placeholder={"Laki - laki"} name={"gender"} id={"L"} />
                            </div>
                            <div className="w-1/2">
                                <RadioEl
                                    optionValue="P"
                                    selectedValue={formRegisOrProfile.gender}
                                    handleChange={(e) => handleChange(e)}
                                    placeholder={"Perempuan"} name={"gender"} id={"P"} />
                            </div>
                        </div>
                    </div>
                    <TextInputEl
                        name="telp"
                        value={formRegisOrProfile.telp}
                        handleChange={(e) => handleChange(e)}
                        placeholder="Nomor Telepon" />
                    <TextInputEl
                        name="address"
                        value={formRegisOrProfile.address}
                        handleChange={(e) => handleChange(e)}
                        placeholder="Alamat" />
                </Modal.Body>
                <Modal.Footer>
                    <button type="button"
                        onClick={() => handleChangeProfile()}
                        className="text-white mt-5 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb">
                        Ubah Profile
                    </button>
                </Modal.Footer>
            </Modal>



            {/* Password */}
            <Modal show={openModalPassword} onClose={() => setOpenModalPassword(false)}>
                <Modal.Header >
                    <b className="">Ubah Kata Sandi</b>
                    <p className="text-[12px]">Silahkan masukkan kata sandi baru untuk akun Anda</p>
                </Modal.Header>
                <Modal.Body>
                    <TextInputEl
                        placeholder="Kata Sandi Saat ini"
                        handleChange={(e) => handleChange(e)}
                        name="fullName"
                    // value={fullName}
                    />
                    <TextInputEl
                        placeholder="Kata Sandi Baru"
                        handleChange={(e) => handleChange(e)}
                        name="fullName"
                        messageInfo="Minimal 8 karakter"
                    // value={fullName}
                    />
                    <TextInputEl
                        placeholder="Konfirmasi Kata Sandi"
                        handleChange={(e) => handleChange(e)}
                        name="fullName"
                    // value={fullName}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex flex-col w-full">
                        <button type="button" className="text-white mt-5 mb-5 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb">
                            Simpan
                        </button>
                        <p className="text-center text-gray-500">Dengan mengubah kata sandi, semua sesi di perangkat lain akan keluar</p>
                    </div>
                </Modal.Footer>
            </Modal>



            {/* MODAL REGIS AND LOGIN*/}
            <Modal show={openModalLoginAndRegis.isActive} size="md" onClose={() => setOpenModalLoginAndRegis({
                isActive: false,
                menuActive: ""
            })} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">
                                Selamat Datang di Tiket Online
                            </h3>
                            <p className="text-center">Silahkan masuk atau daftar untuk melanjutkan</p>
                        </div>

                        <div className="w-full">
                            <Tabs aria-label="Full width tabs" variant="fullWidth">
                                <TabItem active={openModalLoginAndRegis.menuActive == 'login'} title="Masuk">
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
                                <TabItem active={openModalLoginAndRegis.menuActive == 'register'} title="Daftar">
                                    <TextInputEl
                                        placeholder="Nama Lengkap"
                                        handleChange={(e) => handleChange(e)}
                                        name="fullName"
                                        value={formRegisOrProfile.fullName}
                                    />
                                    <TextInputEl
                                        placeholder="Email"
                                        handleChange={(e) => handleChange(e)}
                                        name="email"

                                        value={formRegisOrProfile.email}
                                    />

                                    <div className="w-full flex mb-5">
                                        <div className="w-1/2 mr-2">
                                            <SelectEl
                                                selectedValue={formRegisOrProfile.d_birth_date}
                                                name="d_birth_date"
                                                handleChange={(e) => handleChange(e)}
                                                key={"day"} id={"day"} placeholder={"Tanggal lahir"} />
                                        </div>
                                        <div className="w-1/2 mr-2">
                                            <SelectEl
                                                selectedValue={formRegisOrProfile.m_birth_date}
                                                key={"month"} id={"month"} placeholder="&nbsp;" name="m_birth_date"
                                                handleChange={(e) => handleChange(e)} />
                                        </div>
                                        <div className="w-1/2 mr-2">
                                            <SelectEl
                                                selectedValue={formRegisOrProfile.y_birth_date}
                                                key={"year"} id={"year"} placeholder="&nbsp;" name="y_birth_date"
                                                handleChange={(e) => handleChange(e)} />
                                        </div>
                                    </div>
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
                                                    selectedValue={formRegisOrProfile.gender}
                                                    handleChange={(e) => handleChange(e)}
                                                    placeholder={"Laki - laki"} name={"gender"} id={"L"} />
                                            </div>
                                            <div className="w-1/2">
                                                <RadioEl
                                                    optionValue="P"
                                                    selectedValue={formRegisOrProfile.gender}
                                                    handleChange={(e) => handleChange(e)}
                                                    placeholder={"Perempuan"} name={"gender"} id={"P"} />
                                            </div>
                                        </div>
                                    </div>
                                    <TextInputEl
                                        name="telp"
                                        value={formRegisOrProfile.telp}
                                        handleChange={(e) => handleChange(e)}
                                        placeholder="Nomor Telepon" />
                                    <TextInputEl
                                        name="address"
                                        value={formRegisOrProfile.address}
                                        handleChange={(e) => handleChange(e)}
                                        placeholder="Alamat" />
                                    <TextInputEl
                                        name="password"
                                        type="password"
                                        value={formRegisOrProfile.password}
                                        handleChange={(e) => handleChange(e)}
                                        placeholder="Password" />

                                    <div className="w-full mb-5">
                                        <Button color="blue" onClick={() => handleRegis()} fullSized>Daftar</Button>
                                    </div>
                                    <p className="text-sm">Dengan menggunakan website ini, membeli tiket, atau membuat akun, Anda setuju dengan Syarat Layanan & Kebijakan Privasi</p>
                                </TabItem>
                            </Tabs>

                        </div>


                    </div>
                </ModalBody>
            </Modal>

        </>
    )
}