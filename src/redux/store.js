import { configureStore } from "@reduxjs/toolkit";

import eventReducer from "./feature/eventSlice";
import transactionReducer from "./feature/transactionSlice";
import lineUpReducer from "./feature/lineUpSlice";

const store = configureStore({
    reducer: {
        event: eventReducer,
        transaction: transactionReducer,
        lineUp: lineUpReducer
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