import { configureStore } from "@reduxjs/toolkit";

import eventReducer from "./feature/eventSlice";
import transactionReducer from "./feature/transactionSlice";
import lineUpReducer from "./feature/lineUpSlice";
import categoryTicketReducer from "./feature/categoryTicketSlice";
import cartReducer from "./feature/cartTicketSlice";
import historySlice from "./feature/historiesSlice";
import userSlice from "./feature/userSlice";

const store = configureStore({
    reducer: {
        event: eventReducer,
        transaction: transactionReducer,
        lineUp: lineUpReducer,
        categoryTicket: categoryTicketReducer,
        cart: cartReducer,
        history: historySlice,
        user: userSlice
        //   auth: authReducer,
        //   mountain: mountainReducer,
        //   tourGuide: TourGuideReducer,
        //   hikingPoint: HikingPointReducer,
        //   transaction: transactionReducer,
        //   widraw: widrawReducer,
        //   route: routeReducer,
        //   dashboard: dashboardReducer,
    },
});

export default store;