import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../component/Sidebar";
import { IconLogoBrandEl } from "../component/IconSvg";
import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from "flowbite-react";
export default function LayoutAdmin() {
    const auth = JSON.parse(localStorage.getItem('auth'));
    // const [sidebarOpen, setSidebarOpen] = useState(false);
    const handleLogout = () => {
        localStorage.clear()
        window.location.reload()
    }
    return (
        <>

            <Navbar className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700" fluid rounded>
                <NavbarBrand href="https://flowbite-react.com">
                    <IconLogoBrandEl />
                    {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span> */}
                </NavbarBrand>
                <div className="flex md:order-2">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                        }
                    >
                        <DropdownHeader>
                            <span className="block text-sm">{auth?.fullName}</span>
                            <span className="block truncate text-sm font-medium">{auth?.email}</span>
                        </DropdownHeader>
                        <Link to={"/admin/profile"}>
                            <DropdownItem>

                                Settings

                            </DropdownItem>
                        </Link>
                        <DropdownDivider />
                        <DropdownItem onClick={() => handleLogout()}> Sign out</DropdownItem>
                    </Dropdown>
                    <NavbarToggle />
                </div>
            </Navbar>
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">

                    <Outlet />
                    {/* <IconLogoBrandEl /> */}
                </div>
            </div>
        </>

    )


}