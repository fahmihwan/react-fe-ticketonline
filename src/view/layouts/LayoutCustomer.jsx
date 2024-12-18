import { Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { IconLogoBrandEl } from "../component/IconSvg";

export default function LayoutCustomer({ children }) {

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

                    <div className="flex md:order-2">
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                // <Avatar alt="User settings" img="/assets/user/user.png" rounded />
                                "porfile"
                            }
                        >
                            <Dropdown.Header>
                                {/* username & email */}
                            </Dropdown.Header>

                            <Link to={"/home/profile"}>
                                <Dropdown.Item>Profile</Dropdown.Item>
                            </Link>
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

            <div className="w-full bg-[#FAFCFD]">
                {children}
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
        </>
    )
}