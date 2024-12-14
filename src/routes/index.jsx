import { createBrowserRouter } from "react-router-dom";
import Home from "../view/home/Home";
import DetailEvent from "../view/home/DetailEvent";
import CartTicket from "../view/home/CartTicket";
import Checkout from "../view/transaction/Checkout";
import Payment from "../view/transaction/Payment";
import TransactionHistory from "../view/transaction/TransactionHistory";
import Dashboard from "../view/cmsAdmin/Dashboard";
import Event from "../view/cmsAdmin/event/Event";
import CreateEvent from "../view/cmsAdmin/event/CreateEvent";
import CreateTicket from "../view/cmsAdmin/ticket/CreateTicket";
import Ticket from "../view/cmsAdmin/ticket/Ticket";


const routes = createBrowserRouter([
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
        path: "/",
        element: <Home />
    }, {
        path: "/detail-event",
        element: <DetailEvent />
    }, {
        path: "/cart-ticket",
        element: <CartTicket />
    },
    {
        path: "/checkout",
        element: <Checkout />
    },
    {
        path: "/payment",
        element: <Payment />
    },
    {
        path: "/payment",
        element: <Payment />
    },
    {
        path: "/transaction-history",
        element: <TransactionHistory />
    }


    // 


])

export default routes