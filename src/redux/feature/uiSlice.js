import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        modalLoginOrRegis: {
            isMenuActive: false,
            nameMenuActive: ""
        }
    },
    reducers: {
        setOpenLoginOrRegisUser: (state, action) => {
            state.modalLoginOrRegis.isMenuActive = action.payload.isMenuActive
            state.modalLoginOrRegis.nameMenuActive = action.payload.nameMenuActive
        },

    },
});


// export default uiSlice.reducer;


// export {
//     openLoginModal,
//     closeLoginModal
// };
export const { setOpenLoginOrRegisUser } = uiSlice.actions;
export default uiSlice.reducer