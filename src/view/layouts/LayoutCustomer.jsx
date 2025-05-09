import { Dropdown, Navbar } from "flowbite-react";
import { Link, Outlet } from "react-router-dom";
import { IconLogoBrandEl } from "../component/IconSvg";
import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { RadioEl, SelectEl, TextInputEl } from "../component/InputEl";

export default function LayoutCustomer() {
    const [openModalProfile, setOpenModalProfile] = useState(false);
    const [openModalPassword, setOpenModalPassword] = useState(false);

    const handleChange = (params) => {

    }
    return (
        <>
            <Navbar fluid className="shadow-lg flex justify-center ">
                <div className=" w-full flex items-center">
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

                    <Link to="/transaction-history" className="mr-5">Transaksi</Link>
                    <Link className="mr-5">Ticket</Link>

                    <div className="flex md:order-5">
                        <Dropdown
                            arrowIcon={false}
                            inline
                            className="w-[300px]"
                            label={
                                "porfile"}
                        >
                            <Dropdown.Header >
                                {/* username & email */}
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
                                <Dropdown.Item>
                                    Logout
                                </Dropdown.Item>
                            </button>
                        </Dropdown>
                        <Navbar.Toggle />
                    </div>
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


            {/* Profile */}
            <Modal show={openModalProfile} onClose={() => setOpenModalProfile(false)}>
                <Modal.Header >

                    <b className="">Profil</b>
                    <p className="text-[12px]">Mengubah profil tidak akan mengubah data pada tiket yang telah dibeli</p>
                </Modal.Header>
                <Modal.Body>
                    <TextInputEl
                        placeholder="Nama Lengkap"
                        handleChange={(e) => handleChange(e)}
                        name="full_name"
                    // value={full_name}
                    />
                    <TextInputEl
                        placeholder="Email"
                        handleChange={(e) => handleChange(e)}
                        name="email"
                        readOnly={true}
                        messageInfo="Email tidak dapat diubah"
                        value={"fahmiiwan86@gmail.com"}
                    />

                    <div className="w-full flex mb-5">
                        <div className="w-1/2 mr-2">
                            <SelectEl
                                selectedValue=""
                                name="d_birth_date"
                                handleChange={(e) => handleChange(e)}
                                key={"day"} id={"day"} placeholder={"Tanggal lahir"} />
                        </div>
                        <div className="w-1/2 mr-2">
                            <SelectEl
                                selectedValue=""
                                key={"month"} id={"month"} placeholder="&nbsp;" name="m_birth_date"
                                handleChange={(e) => handleChange(e)} />
                        </div>
                        <div className="w-1/2 mr-2">
                            <SelectEl
                                selectedValue=""
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
                                    selectedValue={"L"}
                                    handleChange={(e) => handleChange(e)}
                                    placeholder={"Laki - laki"} name={"gender"} id={"L"} />
                            </div>
                            <div className="w-1/2">
                                <RadioEl
                                    optionValue="P"
                                    selectedValue={"P"}
                                    handleChange={(e) => handleChange(e)}
                                    placeholder={"Perempuan"} name={"gender"} id={"P"} />
                            </div>
                        </div>
                    </div>
                    <TextInputEl
                        name="telp"
                        value=""
                        handleChange={(e) => handleChange(e)}
                        placeholder="Nomor Telepon" />
                    <TextInputEl
                        name="address"
                        value=""
                        handleChange={(e) => handleChange(e)}
                        placeholder="Alamat" />
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="text-white mt-5 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb">
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
                        name="full_name"
                    // value={full_name}
                    />
                    <TextInputEl
                        placeholder="Kata Sandi Baru"
                        handleChange={(e) => handleChange(e)}
                        name="full_name"
                        messageInfo="Minimal 8 karakter"
                    // value={full_name}
                    />
                    <TextInputEl
                        placeholder="Konfirmasi Kata Sandi"
                        handleChange={(e) => handleChange(e)}
                        name="full_name"
                    // value={full_name}
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

        </>
    )
}