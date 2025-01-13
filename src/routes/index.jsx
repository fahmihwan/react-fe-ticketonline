import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import CreateLineup from "../view/cmsAdmin/event/CreateLineup";


const Home = lazy(() => import("../view/home/Home"));
const DetailEvent = lazy(() => import("../view/home/DetailEvent"));
const CartTicket = lazy(() => import("../view/home/CartTicket"));
const Checkout = lazy(() => import("../view/transaction/Checkout"));

const TransactionHistory = lazy(() => import("../view/transaction/TransactionHistory"));
const Dashboard = lazy(() => import("../view/cmsAdmin/Dashboard"));
const Event = lazy(() => import("../view/cmsAdmin/event/Event"));
const CreateEvent = lazy(() => import("../view/cmsAdmin/event/CreateEvent"));
const CreateTicket = lazy(() => import("../view/cmsAdmin/ticket/CreateTicket"));
const Ticket = lazy(() => import("../view/cmsAdmin/ticket/Ticket"));
const Transaction = lazy(() => import("../view/cmsAdmin/transaction/Transaction"));
const Profile = lazy(() => import("../view/cmsAdmin/profile/Profile"));
const DetailTransaction = lazy(() => import("../view/transaction/DetailTransaction"));


const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    }, {
        path: "/event/:slug",
        element: <DetailEvent />
    }, {
        path: "/event/:slug/tickets",
        element: <CartTicket />
    },
    {
        path: "/event/:slug/checkout",
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
        path: "/admin/event/:slug/lineup",
        element: <CreateLineup />
    },
    {
        path: "/admin/event/:slug/edit",
        element: <CreateEvent />
    },
    {
        path: "/admin/ticket",
        element: <Ticket />
    },
    {
        path: "/admin/ticket/:slug/create",
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