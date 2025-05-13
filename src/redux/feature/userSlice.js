import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/api";



const login = createAsyncThunk("aut/login", async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await apiClient.post("/auth/login", payload)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const registerUser = createAsyncThunk("auth/register", async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await apiClient.post(`/auth/register-user`, payload)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})



const changepassword = createAsyncThunk("auth/changepassword", async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await apiClient.post(`/auth/changepassword`, payload)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        message: "",
        loginData: null,
        regiterData: null,
        status: null,
    },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(login.fulfilled, (state, action) => {
            return (state = {
                ...state,
                loginData: action.payload.data,
                status: "success"
            })
        }).addCase(login.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        }).addCase(registerUser.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(registerUser.fulfilled, (state, action) => {
            return (state = {
                ...state,
                regiterData: action.payload.data,
                status: "success"
            })
        }).addCase(registerUser.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        }).addCase(changepassword.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(changepassword.fulfilled, (state, action) => {
            return (state = {
                ...state,
                regiterData: action.payload.data,
                status: "success"
            })
        }).addCase(changepassword.rejected, (state, action) => {
            return (state = {
                ...state,
                status: "failed",
                error: action.error.message,
            });
        })
    }
})


export {
    login,
    registerUser,
    changepassword
};
export default userSlice.reducer