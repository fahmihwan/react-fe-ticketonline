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

const registerUser = createAsyncThunk("auth/register-user", async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await apiClient.post(`/auth/register-user`, payload)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const registerAdmin = createAsyncThunk("auth/register-admin", async ({ payload }, { rejectWithValue }) => {
    try {
        const response = await apiClient.post(`/auth/register-admin`, payload)
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


const findUserById = createAsyncThunk("user/findByUserId", async ({ userId }, { rejectWithValue }) => {
    try {
        const response = await apiClient.get(`/user/${userId}`)
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
        detailUser: {},
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
        }).addCase(registerAdmin.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(registerAdmin.fulfilled, (state, action) => {
            return (state = {
                ...state,
                regiterData: action.payload.data,
                status: "success"
            })
        }).addCase(registerAdmin.rejected, (state, action) => {
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
        }).addCase(findUserById.pending, (state) => {
            return (state = { ...state, status: "loading" })
        }).addCase(findUserById.fulfilled, (state, action) => {
            return (state = {
                ...state,
                userDetail: action.payload.data,
                status: "success"
            })
        }).addCase(findUserById.rejected, (state, action) => {
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
    changepassword,
    findUserById,
    registerAdmin
};
export default userSlice.reducer