import { configureStore } from "@reduxjs/toolkit";

import eventReducer from "./feature/eventSlice";
import transactionReducer from "./feature/transactionSlice";
import lineUpReducer from "./feature/lineUpSlice";
import categoryTicketReducer from "./feature/categoryTicketSlice";
import cartReducer from "./feature/cartTicketSlice";
import historySlice from "./feature/historiesSlice";
import userSlice from "./feature/userSlice";
import dashboardSlice from "./feature/dashboardSlice"
import uiSlice from "./feature/uiSlice"

const store = configureStore({
    reducer: {
        event: eventReducer,
        transaction: transactionReducer,
        lineUp: lineUpReducer,
        categoryTicket: categoryTicketReducer,
        cart: cartReducer,
        history: historySlice,
        user: userSlice,
        dashboard: dashboardSlice,
        ui: uiSlice
    },
});

export default store;