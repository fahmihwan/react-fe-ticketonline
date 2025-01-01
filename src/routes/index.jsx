import { createBrowserRouter } from "react-router-dom";
import Home from "../view/home/Home";
import DetailEvent from "../view/home/DetailEvent";
import CartTicket from "../view/home/CartTicket";
import Checkout from "../view/transaction/Checkout";

import TransactionHistory from "../view/transaction/TransactionHistory";
import Dashboard from "../view/cmsAdmin/Dashboard";
import Event from "../view/cmsAdmin/event/Event";
import CreateEvent from "../view/cmsAdmin/event/CreateEvent";
import CreateTicket from "../view/cmsAdmin/ticket/CreateTicket";
import Ticket from "../view/cmsAdmin/ticket/Ticket";
import Transaction from "../view/cmsAdmin/transaction/Transaction";
import Profile from "../view/cmsAdmin/profile/Profile";
import DetailTransaction from "../view/transaction/DetailTransaction";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    }, {
        path: "/event/:id",
        element: <DetailEvent />
    }, {
        path: "/event/:id/tickets",
        element: <CartTicket />
    },
    {
        path: "/event/:id/checkout",
        element: <Checkout />
    },
    {
        path: "/transaction-history",
        element: <TransactionHistory />
    },
    {
        path: "/transaction-history/:id",
        element: <DetailTransaction />
    },
    {
        path: "/admin/dashboard",
        element: <Dashboard />
    },
    {
        path: "/admin/event",
        element: <Event />
    },
    {
        path: "/admin/event/create",
        element: <CreateEvent />
    },
    {
        path: "/admin/ticket",
        element: <Ticket />
    },
    {
        path: "/admin/ticket/:id/create",
        element: <CreateTicket />
    },
    {
        path: "/admin/transaction",
        element: <Transaction />
    },
    {
        path: "/admin/profile",
        element: <Profile />
    },

])

export default routes