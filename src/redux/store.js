import { configureStore } from "@reduxjs/toolkit";

import eventReducer from "./feature/eventSlice";

const store = configureStore({
    reducer: {
        event: eventReducer
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