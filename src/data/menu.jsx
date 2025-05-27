import { IconDashboard, IconEvenetEl, IconProfileEl, IconTicketEl, IconTransactionEl } from "../view/component/IconSvg"

const menuAdmin = [
    {
        title: 'Dashboard',
        link: '/admin/dashboard',
        icon: <IconDashboard />,
        submenu: null,

    },
    {
        title: 'Event',
        link: "/admin/event",
        icon: <IconEvenetEl />,
        submenu: null,
    },
    {
        title: 'Ticket',
        link: "/admin/ticket",
        icon: <IconTicketEl />,
        submenu: null,
    },
    {
        title: 'Transaction',
        link: "/admin/transaction",
        icon: <IconTransactionEl />,
        submenu: null,
    },
    {
        title: 'Checker',
        link: "/admin/checker",
        icon: <IconTransactionEl />,
        submenu: null,
    },
    {
        title: 'Profile',
        link: "/admin/profile",
        icon: <IconProfileEl />,
        submenu: null,
    }

    // {
    //     title: 'Survey',
    //     link: null,
    //     icon: null,
    //     submenu: [
    //         {
    //             title: 'Dashboard Survey',
    //             link: '/dashboard-hasil-survey',
    //             icon: null,
    //         },
    //         {
    //             title: 'Data Hasil Survey',
    //             link: '/data-hasil-survey',
    //             icon: null,
    //         },
    //         {
    //             title: 'QR Code',
    //             link: '/qrcode',
    //             icon: null,
    //         }
    //     ],
    // },
]


const menuChecker = [
    {
        title: 'Dashboard',
        link: '/admin/dashboard',
        icon: <IconDashboard />,
        submenu: null,

    },
    {
        title: 'Scan Ticket',
        link: "/checker/scanticket",
        icon: <IconEvenetEl />,
        submenu: null,
    },
    {
        title: 'Log Checker',
        link: "/checker/logchecker",
        icon: <IconEvenetEl />,
        submenu: null,
    },
]



export { menuAdmin, menuChecker } 