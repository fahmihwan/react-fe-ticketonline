import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import { IconLogoBrandEl } from "../component/IconSvg";

import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Select } from "flowbite-react";
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
    const [openModal, setOpenModal] = useState(false);
    // const [modalPlacement, setModalPlacement] = useState("");

    const auth = JSON.parse(localStorage.getItem('auth'));
    useEffect(() => {
        if (auth.role == 'CHECKER') {
            setOpenModal(true)

        } else {
            setOpenModal(false)
        }


    }, [auth])


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

            {/* <div className="flex flex-wrap gap-4">
                <div className="w-40">
                    <Select defaultValue="center" onChange={(event) => setModalPlacement(event.target.value)}>
                        <option value="center">Center</option>
                        <option value="top-left">Top left</option>
                        <option value="top-center">Top center</option>
                        <option value="top-right">Top right</option>
                        <option value="center-left">Center left</option>
                        <option value="center-right">Center right</option>
                        <option value="bottom-right">Bottom right</option>
                        <option value="bottom-center">Bottom center</option>
                        <option value="bottom-left">Bottom left</option>
                    </Select>
                </div>
                <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
            </div> */}

            <Modal show={openModal} position={'center'} onClose={() => setOpenModal(false)}>
                <ModalHeader>Pilih Event</ModalHeader>
                <ModalBody>
                    <div className="space-y-6 p-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
                            companies around the world are updating their terms of service agreements to comply.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
                            to ensure a common set of data rights in the European Union. It requires organizations to notify users as
                            soon as possible of high-risk data breaches that could personally affect them.
                        </p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => setOpenModal(false)}>I accept</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </ModalFooter>
            </Modal>
        </>

    )


}