import { createSlice } from "@reduxjs/toolkit";
import { signupUser, userLogin,getUser } from "../thunks/authThunk";

const authSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
    success: false,
    login:null,
    accessToken: null,
    rememberMe: false,
    isAuthenticated:null,
    userDetail:null,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      localStorage.setItem("isAuthenticated", JSON.stringify(action.payload));
      state.isAuthenticated = action.payload;
    },

    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      
      // Store in the appropriate storage based on rememberMe state
      if (state.rememberMe) {
        localStorage.setItem("accessToken", action.payload);
      } else {
        localStorage.setItem("accessToken", action.payload);
      }
    },

    logoutApp: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.success = false;
      state.userEmail=null

      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("accessToken");

    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.login = action.payload;
        state.success = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ;
        state.success = false;
      })

      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetail = action.payload;
        state.success = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ;
        state.success = false;
      })
  },
});

export const { setAuthenticated, setAccessToken, logoutApp } = authSlice.actions;

export default authSlice.reducer;
