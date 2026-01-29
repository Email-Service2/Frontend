import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/appConfig";

const signupUser = createAsyncThunk(
  "user/signup",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/user/signup`, values, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 201 && res.data.success === true) {
        return res.data; // success data
      } else if (res.status === 200 && res.data.success === false) {
        return rejectWithValue("Email already exists. Please Login.");
      } else {
        return rejectWithValue("Unexpected response.");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Server error, please try again."
      );
    }
  }
);

const userLogin = createAsyncThunk(
  "user/login",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/user/login`, values, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200 && res.data.success === true) {
        return res.data; // success data
      } else if (res.status === 200 && res.data.success === false) {
        return rejectWithValue("Email already exists. Please Login.");
      } else {
        return rejectWithValue("Unexpected response.");
      }
    } catch (error) {
      if (error.response) {

        console.log(error);
        
        // Server responded with a status outside 2xx
        if (error.response.status === 400) {
          return rejectWithValue("Email and Password are required.");
        }
        if (error.response.status === 401) {
          return rejectWithValue("Invalid email or password.");
        }
        return rejectWithValue(error.response.data.message);
      } else if (error.request) {
        // No response from server
        return rejectWithValue("No response from server. Please try again.");
      } else {
        // Something else went wrong
        return rejectWithValue("Unexpected error occurred.");
      }
    }
  }
);

const getUser = createAsyncThunk(
  "user/getUser",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/user/get-user`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          }
      });

      if (res.status === 200 && res.data.success === true) {
        return res.data; // success data
      } else if (res.status === 200 && res.data.success === false) {
        return rejectWithValue("Email already exists. Please Login.");
      } else {
        return rejectWithValue("Unexpected response.");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status outside 2xx
        if (error.response.status === 400) {
          return rejectWithValue("Email and Password are required.");
        }
        if (error.response.status === 401) {
          return rejectWithValue("Invalid email or password.");
        }
        return rejectWithValue(error.response.data.message);
      } else if (error.request) {
        // No response from server
        return rejectWithValue("No response from server. Please try again.");
      } else {
        // Something else went wrong
        return rejectWithValue("Unexpected error occurred.");
      }
    }
  }
);

export { signupUser, userLogin,getUser };
