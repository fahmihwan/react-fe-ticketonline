import { Link, useLocation } from "react-router-dom";
import { IconDashboard, IconEvenetEl, IconLogoutEl, IconProfileEl, IconTicketEl, IconTransactionEl } from "./IconSvg";

export default function Sidebar() {
    // Menyimpan item menu yang aktif
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
                <ul className="space-y-2 font-medium">
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
                    {/* <li>
                        <a
                            href="#"
                            className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group"
                        >
                            <svg
                                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 20"
                            >
                                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                        </a>
                    </li> */}
                    <li>
                        <Link to="/admin/user"
                            className={`flex items-center p-2 text-gray-900 rounded-lg group ${isActive('/admin/user') && 'bg-gray-200'}`}
                        >
                            <IconLogoutEl />
                            <span className="flex-1 ms-3 whitespace-nowrap">Log out</span>
                        </Link>
                    </li>

                </ul>
            </div>
        </aside>
    )
}