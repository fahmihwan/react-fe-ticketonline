import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import CreateLineup from "../view/cmsAdmin/event/CreateLineup";
import LayoutAdmin from "../view/layouts/LayoutAdmin";
import LayoutCustomer from "../view/layouts/LayoutCustomer";
import LoginAdmin from "../view/cmsAdmin/LoginAdmin";
import { ProtectedRouteAdmin, ProtectedRouteUser } from "./ProtectedRoute";
import EventChecker from "../view/cmsAdmin/checker/EventChecker";
import CreateChecker from "../view/cmsAdmin/checker/CreateChecker";
import ScanTicket from "../view/checker/scanTicket/ScanTicket";
import ListLogChecker from "../view/checker/logVerifikasi/ListLogChecker";


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
        element: <LayoutCustomer />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/event/:slug", element: <DetailEvent /> },
            { path: "/event/:slug/tickets", element: <CartTicket /> },
            { path: "/event/:slug/checkout", element: <ProtectedRouteUser element={<Checkout />} /> },
            { path: "/transaction-history", element: <ProtectedRouteUser element={<TransactionHistory />} /> },
            { path: "/transaction-history/:transactionCode", element: <ProtectedRouteUser element={<DetailTransaction />} /> },
        ]
    },
    {
        path: "/admin/login",
        element: <LoginAdmin />,
    },
    {
        // element
        element: <ProtectedRouteAdmin element={<LayoutAdmin />} />,
        children: [
            { path: "/admin/dashboard", element: <Dashboard /> },
            { path: "/admin/event", element: <Event /> },
            { path: "/admin/event/create", element: <CreateEvent /> },
            { path: "/admin/event/:slug/lineup", element: <CreateLineup /> },
            { path: "/admin/event/:slug/edit", element: <CreateEvent /> },
            { path: "/admin/ticket", element: <Ticket /> },
            { path: "/admin/ticket/:slug/create", element: <CreateTicket /> },
            { path: "/admin/transaction", element: <Transaction /> },
            { path: "/admin/checker", element: <EventChecker /> },
            { path: "/admin/checker/:slug/create", element: <CreateChecker /> },
            { path: "/admin/profile", element: <Profile /> },
        ]
    },
    {
        element: <LayoutAdmin />,
        children: [
            { path: "/checker/scanticket", element: <ScanTicket /> },
            { path: "/checker/logchecker", element: <ListLogChecker /> },
        ]


    }


])

export default routes