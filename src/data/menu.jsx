import { IconDashboard, IconEvenetEl, IconProfileEl, IconTicketEl, IconTransactionEl } from "../view/component/IconSvg"

const menu = [
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
        title: 'Profile',
        link: "/admin/profile",
        icon: <IconProfileEl />,
        submenu: null,
    },
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

export default menu