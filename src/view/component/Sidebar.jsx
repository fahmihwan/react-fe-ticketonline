import { Link, useLocation } from "react-router-dom";
import { IconDashboard, IconEvenetEl, IconLogoutEl, IconProfileEl, IconTicketEl, IconTransactionEl } from "./IconSvg";
import { useSidebar } from "../../context/SidebarContext";
import menu from "../../data/menu";

export default function Sidebar() {
    // Menyimpan item menu yang aktif
    const { isDrawerOpen, toggleDrawer, dropDown, toggleDropdown } = useSidebar();

    const location = useLocation();


    // Fungsi untuk memeriksa apakah path saat ini mengandung prefix tertentu
    const isActive = (path) => {
        return location.pathname.startsWith(path);
    };




    return (
        <aside
            id="logo-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <MenuEl menu={menu} dropDown={dropDown} toggleDropdown={toggleDropdown} />
                {/* <ul className="space-y-2 font-medium">
                    <li>
                        <Link to="/admin/dashboard"
                            className={`flex items-center p-2 text-gray-900 rounded-lg group ${isActive('/admin/dashboard') && 'bg-gray-200'}`}

                        >
                            <IconDashboard />
                            <span className="ms-3">Dashboard</span>
                        </Link>

                    </li>
                    <li>

                        <Link to="/admin/event"
                            className={`flex items-center p-2 text-gray-900 rounded-lg group ${isActive('/admin/event') && 'bg-gray-200'}`}
                        >
                            <IconEvenetEl />
                            <span className="flex-1 ms-3 whitespace-nowrap">Event</span>

                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/ticket"
                            className={`flex items-center p-2 text-gray-900 rounded-lg group ${isActive('/admin/ticket') && 'bg-gray-200'}`}
                        >
                            <IconTicketEl />
                            <span className="flex-1 ms-3 whitespace-nowrap">Ticket</span>

                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/transaction"
                            className={`flex items-center p-2 text-gray-900 rounded-lg group ${isActive('/admin/transaction') && 'bg-gray-200'}`}
                        >
                            <IconTransactionEl />
                            <span className="flex-1 ms-3 whitespace-nowrap">Transaction</span>

                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/profile"
                            className={`flex items-center p-2 text-gray-900 rounded-lg group ${isActive('/admin/profile') && 'bg-gray-200'}`}
                        >
                            <IconProfileEl />
                            <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/user"
                            className={`flex items-center p-2 text-gray-900 rounded-lg group ${isActive('/admin/user') && 'bg-gray-200'}`}
                        >
                            <IconLogoutEl />
                            <span className="flex-1 ms-3 whitespace-nowrap">Log out</span>
                        </Link>
                    </li>

                </ul> */}
            </div>
        </aside>
    )
}



export const MenuEl = ({ menu, dropDown, toggleDropdown }) => {
    return (
        <ul className="space-y-2 font-medium">
            {menu.map((d, i) => (
                <div key={i}>
                    {d?.submenu == null ? (
                        <li >
                            <Link
                                to={d?.link}
                                className={`flex items-center py-3 px-3 text-gray-900 rounded-lg group ${location.pathname == d.link && 'bg-gray-200'}`}
                                // className={`flex flex-row gap-3 items-center border border-black dark:border-white p-2 
                                // rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group
                                // ${location.pathname === d.link ? "bg-gray-200 hover:text-gray-900 dark:bg-gray-hover" : "text-gray-900"} `}
                                onClick={() => toggleDropdown(null)}
                            >

                                {d?.icon}
                                <span className="text-sm ms-2">{d?.title}</span>
                            </Link>
                        </li>
                    ) : (
                        <li
                            style={{ marginBottom: "20px" }}
                            onClick={(e) => {
                                e.stopPropagation()
                                toggleDropdown(d?.title)
                            }}
                        >
                            <button
                                type="button"
                                className={`flex border border-black dark:border-white items-center w-full p-2 text-sm text-gray-900 
                                transition duration-75 rounded-lg group dark:text-white`}
                            >
                                <span className="w-5 h-5 flex items-center justify-center">
                                    {d?.icon}
                                </span>
                                <span className="flex-1 ml-3 text-left rtl:text-right whitespace-nowrap">
                                    {d?.title}
                                </span>
                                <svg
                                    className={`w-3 h-3 transition-transform duration-300 ${d?.title === dropDown ? "rotate-0" : "-rotate-90"
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>

                            <ul className={`${d?.title === dropDown ? 'max-h-[1000px]' : 'max-h-0'} overflow-hidden py-0 space-y-2 transform transition-all duration-300 ease-in-out`}>
                                {d?.submenu?.map((x, index) => (
                                    <li key={index} className={`${index === 0 ? "mt-2" : ""}`}>
                                        <Link
                                            to={x.link}
                                            className={`flex flex-row gap-3 items-center p-2 transition duration-75 rounded-lg ml-8 
                                            group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700
                                            ${location.pathname.includes(x.link) ? "bg-gray-200 hover:text-gray-900 dark:bg-gray-hover" : "text-gray-900"}`}
                                            onClick={(e) => e.stopPropagation()}
                                        >

                                            <span className="w-5 h-5 flex items-center justify-center">
                                                {x?.icon}
                                            </span>
                                            {x?.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )}
                </div>
            ))}
        </ul>
    );
};
