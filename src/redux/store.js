import { configureStore } from "@reduxjs/toolkit";

import eventReducer from "./feature/eventSlice";
import transactionReducer from "./feature/transactionSlice";

const store = configureStore({
    reducer: {
        event: eventReducer,
        transaction: transactionReducer
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