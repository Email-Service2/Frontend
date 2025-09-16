import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/appConfig";

const sendEmail = createAsyncThunk(
  "email/sendEmail",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/email/send`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (res.status === 200 && res.data.success === true) {
        return res.data; // success data
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

const emails = createAsyncThunk(
  "email/emails",
  async ({ activeFolder, query }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/email/inbox`, {
        params: { folder: activeFolder, search: query || "" },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      console.log("Emails response:", res);

      if (res.status === 200 && res.data.success === true) {
        return res.data; // success data
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

const viewedMail = createAsyncThunk(
  "email/viewedMail",
  async (_id, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/email/update-read-status`,
        { _id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      console.log("Emails response:", res);

      if (res.status === 200 && res.data.success === true) {
        return res.data; // success data
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

const important = createAsyncThunk(
  "email/important",
  async (_id, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/email/important`,
        { _id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      console.log("Emails response:", res);

      if (res.status === 200 && res.data.success === true) {
        return res.data; // success data
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

const deleteMail = createAsyncThunk(
  "email/deleteMail",
  async (_id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/email/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        data: { _id }, // 👈 body goes here
      });

      console.log("Emails response:", res);

      if (res.status === 200 && res.data.success === true) {
        return res.data; // success data
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

const archive = createAsyncThunk(
  "email/archive",
  async (_id, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/email/archive`,
        { _id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      console.log("Emails response:", res);

      if (res.status === 200 && res.data.success === true) {
        return res.data; // success data
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

const updateProfile = createAsyncThunk(
  "email/viewedMail",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/email/update-user`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      console.log("Emails response:", res);

      if (res.status === 200 && res.data.success === true) {
        return res.data; // success data
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

const updateRead = createAsyncThunk(
  "email/updateRead",
  async (_id, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/email/update-read`,
        { _id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (res.status === 200 && res.data.success === true) {
        return res.data; // success data
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

const deleteParmanentaly = createAsyncThunk(
  "email/deleteParmanentaly",
  async (_id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/email/parmanently-delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        data: { _id }, 
      });

      if (res.status === 200 && res.data.success === true) {
        return res.data; // success data
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

export {
  sendEmail,
  emails,
  viewedMail,
  important,
  deleteMail,
  archive,
  updateProfile,
  updateRead,
  deleteParmanentaly
};
